using ugc.API.Models;
using ugc.API.Repositories;

namespace ugc.API.Services;

public interface IReportService
{
    Task<Report> CreateAsync(Guid reporterId, Report report, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<Report>> GetOpenAsync(CancellationToken cancellationToken = default);
    Task<bool> ResolveAsync(Guid reportId, ReportStatus status, CancellationToken cancellationToken = default);
}

public sealed class ReportService : IReportService
{
    private readonly IRepository<Report> _repository;

    public ReportService(IRepository<Report> repository)
    {
        _repository = repository;
    }

    public Task<Report> CreateAsync(Guid reporterId, Report report, CancellationToken cancellationToken = default)
    {
        report.Id = Guid.NewGuid();
        report.ReporterId = reporterId;
        report.CreatedAt = DateTimeOffset.UtcNow;
        report.Status = ReportStatus.Open;
        return _repository.AddAsync(report, cancellationToken);
    }

    public Task<IReadOnlyList<Report>> GetOpenAsync(CancellationToken cancellationToken = default)
        => _repository.ListAsync(r => r.Status == ReportStatus.Open, cancellationToken);

    public async Task<bool> ResolveAsync(Guid reportId, ReportStatus status, CancellationToken cancellationToken = default)
    {
        var existing = await _repository.GetByIdAsync(reportId, cancellationToken);
        if (existing is null)
        {
            return false;
        }

        existing.Status = status;
        await _repository.UpdateAsync(existing, cancellationToken);
        return true;
    }
}
