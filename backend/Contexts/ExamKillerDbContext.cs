using Microsoft.EntityFrameworkCore;

public class ExamKillerDbContext : DbContext
{
   public DbSet<User> Users { get; set; }
   public DbSet<Room> Rooms { get; set; }
   
   public ExamKillerDbContext(DbContextOptions<ExamKillerDbContext> options) : base(options) {}
}