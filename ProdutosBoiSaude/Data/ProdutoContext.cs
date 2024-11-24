using Microsoft.EntityFrameworkCore;
using ProdutosBoiSaude.Models;

namespace ProdutosBoiSaude.Data;

public class ProdutoContext : DbContext
{
    public ProdutoContext(DbContextOptions<ProdutoContext> options)
        : base(options)
    {
    }

    public DbSet<Produto> Produtos { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Produto>()
            .Property(p => p.PrecoCusto)
            .HasColumnType("decimal(18,2)");

        modelBuilder.Entity<Produto>()
            .Property(p => p.PrecoVenda)
            .HasColumnType("decimal(18,2)");
    }
}