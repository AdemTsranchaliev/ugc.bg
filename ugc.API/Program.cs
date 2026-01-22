using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Npgsql;
using ugc.API.Auth;
using ugc.API.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "ugc.API",
        Version = "v1"
    });

    var jwtScheme = new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Name = "Authorization",
        Description = "Enter: Bearer {token}",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        Reference = new Microsoft.OpenApi.Models.OpenApiReference
        {
            Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
            Id = "Bearer"
        }
    };

    options.AddSecurityDefinition("Bearer", jwtScheme);
    options.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        [jwtScheme] = Array.Empty<string>()
    });
});

var connectionString = builder.Configuration.GetConnectionString("UgcDatabase");
if (string.IsNullOrWhiteSpace(connectionString))
{
    throw new InvalidOperationException("Connection string 'UgcDatabase' was not found.");
}

var dataSourceBuilder = new NpgsqlDataSourceBuilder(connectionString);
dataSourceBuilder.EnableDynamicJson();
var dataSource = dataSourceBuilder.Build();

builder.Services.AddDbContext<UgcDbContext>(options =>
    options.UseNpgsql(dataSource));

builder.Services.AddScoped(typeof(ugc.API.Repositories.IRepository<>), typeof(ugc.API.Repositories.EfRepository<>));
builder.Services.AddScoped<ugc.API.Repositories.ICategoryRepository, ugc.API.Repositories.CategoryRepository>();
builder.Services.AddScoped<ugc.API.Repositories.IListingRepository, ugc.API.Repositories.ListingRepository>();
builder.Services.AddScoped<ugc.API.Repositories.IUserRepository, ugc.API.Repositories.UserRepository>();
builder.Services.AddScoped<ugc.API.Services.ICategoryService, ugc.API.Services.CategoryService>();
builder.Services.AddScoped<ugc.API.Services.IListingService, ugc.API.Services.ListingService>();
builder.Services.AddScoped<ugc.API.Services.IProfileService, ugc.API.Services.ProfileService>();
builder.Services.AddScoped<ugc.API.Services.IListingMediaService, ugc.API.Services.ListingMediaService>();
builder.Services.AddScoped<ugc.API.Services.IConversationService, ugc.API.Services.ConversationService>();
builder.Services.AddScoped<ugc.API.Services.IReviewService, ugc.API.Services.ReviewService>();
builder.Services.AddScoped<ugc.API.Services.IBriefService, ugc.API.Services.BriefService>();
builder.Services.AddScoped<ugc.API.Services.IBillingService, ugc.API.Services.BillingService>();
builder.Services.AddScoped<ugc.API.Services.IBoostService, ugc.API.Services.BoostService>();
builder.Services.AddScoped<ugc.API.Services.IReportService, ugc.API.Services.ReportService>();
builder.Services.AddScoped<ugc.API.Services.ISearchService, ugc.API.Services.SearchService>();
builder.Services.AddScoped<ugc.API.Services.IPlanService, ugc.API.Services.PlanService>();
builder.Services.AddScoped<ugc.API.Services.IHomeService, ugc.API.Services.HomeService>();
builder.Services.AddScoped<ugc.API.Services.IAdminService, ugc.API.Services.AdminService>();
builder.Services.AddScoped<ugc.API.Auth.IAuthService, ugc.API.Auth.AuthService>();
builder.Services.AddSingleton<ugc.API.Auth.IAuthTokenService, ugc.API.Auth.AuthTokenService>();
builder.Services.AddSingleton<Microsoft.AspNetCore.Identity.PasswordHasher<ugc.API.Models.User>>();

builder.Services.Configure<AuthOptions>(builder.Configuration.GetSection(AuthOptions.SectionName));
var authOptions = builder.Configuration.GetSection(AuthOptions.SectionName).Get<AuthOptions>();
if (authOptions is null || string.IsNullOrWhiteSpace(authOptions.SigningKey))
{
    throw new InvalidOperationException("Auth signing key is missing. Configure Auth:SigningKey.");
}

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = authOptions.Issuer,
            ValidAudience = authOptions.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authOptions.SigningKey))
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy(AuthConstants.UserPolicy, policy =>
        policy.RequireRole(nameof(ugc.API.Models.UserRole.Creator), nameof(ugc.API.Models.UserRole.Business), nameof(ugc.API.Models.UserRole.Admin)));
    options.AddPolicy(AuthConstants.AdminPolicy, policy =>
        policy.RequireRole(nameof(ugc.API.Models.UserRole.Admin)));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

await DatabaseSeeder.SeedAsync(app.Services);

await app.RunAsync();
