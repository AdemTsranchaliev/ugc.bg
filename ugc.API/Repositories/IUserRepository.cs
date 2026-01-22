using ugc.API.Models;

namespace ugc.API.Repositories;

public interface IUserRepository : IRepository<User>
{
    Task<User?> GetByIdWithProfilesAsync(Guid id, CancellationToken cancellationToken = default);
}
