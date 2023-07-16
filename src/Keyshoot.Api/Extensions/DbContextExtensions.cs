using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace Keyshoot.Api.Extensions;

public class PagedResult<T>
{
    public List<T> Items { get; set; } = default!;
    public int TotalCount { get; set; }
    public int PageIndex { get; set; }
    public int PageSize { get; set; }
}

public static class DbContextExtensions
{
    public static async Task<PagedResult<TDestination>> GetPagedData<TDestination, TSource>(
        this IQueryable<TSource> query,
        IMapper mapper,
        int page,
        int pageSize,
        CancellationToken cancellationToken = default)
        where TDestination : class
        where TSource : class
    {
        var totalCount = await query.CountAsync(cancellationToken);

        var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

        if (page > totalPages)
        {
            throw new ArgumentOutOfRangeException(nameof(page));
        }

        var items = await query
            .Skip((page) * pageSize)
            .Take(pageSize)
            .ProjectTo<TDestination>(mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);

        return new PagedResult<TDestination>
        {
            Items = items,
            TotalCount = totalCount,
            PageIndex = page,
            PageSize = pageSize
        };
    }
}
