using Microsoft.EntityFrameworkCore;
using ugc.API.Data;
using ugc.API.Models;

namespace ugc.API.Repositories;

public sealed class UserRepository : EfRepository<User>, IUserRepository
{
    public UserRepository(UgcDbContext dbContext)
        : base(dbContext)
    {
    }

    public async Task<User?> GetByIdWithProfilesAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await DbContext.Users
            .AsNoTracking()
            .Include(u => u.CreatorProfile)
            .Include(u => u.BusinessProfile)
            .FirstOrDefaultAsync(u => u.Id == id, cancellationToken);
    }
}
