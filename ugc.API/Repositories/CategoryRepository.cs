using ugc.API.Data;
using ugc.API.Models;

namespace ugc.API.Repositories;

public sealed class CategoryRepository : EfRepository<Category>, ICategoryRepository
{
    public CategoryRepository(UgcDbContext dbContext)
        : base(dbContext)
    {
    }
}
