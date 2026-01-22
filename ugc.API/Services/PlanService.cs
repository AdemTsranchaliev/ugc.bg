using ugc.API.Models;
using ugc.API.Repositories;

namespace ugc.API.Services;

public interface IPlanService
{
    Task<IReadOnlyList<Plan>> GetAllAsync(CancellationToken cancellationToken = default);
}

public sealed class PlanService : IPlanService
{
    private readonly IRepository<Plan> _repository;

    public PlanService(IRepository<Plan> repository)
    {
        _repository = repository;
    }

    public Task<IReadOnlyList<Plan>> GetAllAsync(CancellationToken cancellationToken = default)
        => _repository.ListAsync(cancellationToken);
}
