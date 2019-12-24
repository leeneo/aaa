using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using ODataDemo.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODataDemo.Models
{
    public class ODataDbContext : BaseDb
    {
        public ODataDbContext(IOptions<AppSettings> settings) : base(settings)
        {
        }


        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<Press> Presses { get; set; }
        public virtual DbSet<Book> Books { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                //#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                //var connectionStr = "User ID=lish;password=00000;Host=localhost;Port=5432;Database=postgres2";
                var connectionStr = _settings.Value.DefaultConnection.PostgreSql;
                optionsBuilder.UseNpgsql(connectionStr);
            }
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Press>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("Press");

                entity.Property(e => e.Id)
                    .HasColumnName("Id")
                    .HasMaxLength(5)
                    .IsUnicode(false)
                    .UseNpgsqlSerialColumn();

                entity.Property(e => e.Name)
                    .HasColumnName("Name")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Category)
                    .HasColumnName("Category")
                    .HasMaxLength(20);

                entity.Property(e => e.Email)
                    .HasColumnName("Email")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("User");

                entity.Property(e => e.Id)
                    .HasColumnName("Id")
                    .HasMaxLength(5)
                    .IsUnicode(false)
                    .UseNpgsqlSerialColumn();

                entity.Property(e => e.Name)
                    .HasColumnName("Name")
                    .HasMaxLength(20)
                    .IsUnicode(false);

            });
            modelBuilder.Entity<Book>(entity => { entity.HasKey(e => e.Id); });

        }
    }
}
