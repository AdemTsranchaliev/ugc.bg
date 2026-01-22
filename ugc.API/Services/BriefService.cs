using Microsoft.EntityFrameworkCore;
using ugc.API.Data;
using ugc.API.Models;
using ugc.API.Repositories;

namespace ugc.API.Services;

public interface IBriefService
{
    Task<IReadOnlyList<ProjectBrief>> GetPublicAsync(CancellationToken cancellationToken = default);
    Task<ProjectBrief?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<ProjectBrief> CreateAsync(Guid businessId, ProjectBrief brief, CancellationToken cancellationToken = default);
    Task<bool> UpdateAsync(Guid id, Guid businessId, ProjectBrief updated, CancellationToken cancellationToken = default);
    Task<bool> CloseAsync(Guid id, Guid businessId, CancellationToken cancellationToken = default);
    Task<BriefApplication> ApplyAsync(Guid briefId, Guid creatorId, BriefApplication application, CancellationToken cancellationToken = default);
    Task<bool> UpdateApplicationStatusAsync(Guid applicationId, BriefApplicationStatus status, CancellationToken cancellationToken = default);
}

public sealed class BriefService : IBriefService
{
    private readonly UgcDbContext _dbContext;
    private readonly IRepository<ProjectBrief> _briefRepository;
    private readonly IRepository<BriefApplication> _applicationRepository;

    public BriefService(
        UgcDbContext dbContext,
        IRepository<ProjectBrief> briefRepository,
        IRepository<BriefApplication> applicationRepository)
    {
        _dbContext = dbContext;
        _briefRepository = briefRepository;
        _applicationRepository = applicationRepository;
    }

    public async Task<IReadOnlyList<ProjectBrief>> GetPublicAsync(CancellationToken cancellationToken = default)
    {
        return await _dbContext.ProjectBriefs
            .AsNoTracking()
            .Where(b => b.Status == ProjectBriefStatus.Open)
            .OrderByDescending(b => b.CreatedAt)
            .ToListAsync(cancellationToken);
    }

    public Task<ProjectBrief?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        => _briefRepository.GetByIdAsync(id, cancellationToken);

    public Task<ProjectBrief> CreateAsync(Guid businessId, ProjectBrief brief, CancellationToken cancellationToken = default)
    {
        brief.Id = Guid.NewGuid();
        brief.BusinessId = businessId;
        brief.Status = ProjectBriefStatus.Open;
        brief.CreatedAt = DateTimeOffset.UtcNow;
        return _briefRepository.AddAsync(brief, cancellationToken);
    }

    public async Task<bool> UpdateAsync(Guid id, Guid businessId, ProjectBrief updated, CancellationToken cancellationToken = default)
    {
        var existing = await _briefRepository.GetByIdAsync(id, cancellationToken);
        if (existing is null || existing.BusinessId != businessId)
        {
            return false;
        }

        existing.Type = updated.Type;
        existing.Niche = updated.Niche;
        existing.Title = updated.Title;
        existing.Description = updated.Description;
        existing.Requirements = updated.Requirements;
        existing.BudgetMin = updated.BudgetMin;
        existing.BudgetMax = updated.BudgetMax;
        existing.Deadline = updated.Deadline;
        existing.DeliveryPolicy = updated.DeliveryPolicy;
        existing.Links = updated.Links;

        await _briefRepository.UpdateAsync(existing, cancellationToken);
        return true;
    }

    public async Task<bool> CloseAsync(Guid id, Guid businessId, CancellationToken cancellationToken = default)
    {
        var existing = await _briefRepository.GetByIdAsync(id, cancellationToken);
        if (existing is null || existing.BusinessId != businessId)
        {
            return false;
        }

        existing.Status = ProjectBriefStatus.Closed;
        await _briefRepository.UpdateAsync(existing, cancellationToken);
        return true;
    }

    public Task<BriefApplication> ApplyAsync(
        Guid briefId,
        Guid creatorId,
        BriefApplication application,
        CancellationToken cancellationToken = default)
    {
        application.Id = Guid.NewGuid();
        application.BriefId = briefId;
        application.CreatorId = creatorId;
        application.Status = BriefApplicationStatus.Sent;
        application.CreatedAt = DateTimeOffset.UtcNow;
        return _applicationRepository.AddAsync(application, cancellationToken);
    }

    public async Task<bool> UpdateApplicationStatusAsync(
        Guid applicationId,
        BriefApplicationStatus status,
        CancellationToken cancellationToken = default)
    {
        var existing = await _applicationRepository.GetByIdAsync(applicationId, cancellationToken);
        if (existing is null)
        {
            return false;
        }

        existing.Status = status;
        await _applicationRepository.UpdateAsync(existing, cancellationToken);
        return true;
    }
}
