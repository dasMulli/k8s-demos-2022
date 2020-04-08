using Microsoft.EntityFrameworkCore;

namespace DotNetToDo
{
    public class ToDoDbContext : DbContext
    {
        public ToDoDbContext(DbContextOptions<ToDoDbContext> options)
          : base(options)
        {
            
        }
        public DbSet<ToDoItem> ToDoItems { get; set; }
    }
}