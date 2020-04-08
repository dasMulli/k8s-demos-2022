using System;

namespace DotNetToDo
{
    public class ToDoItem
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public DateTime CompleteUntil { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }
        
        public string UserSubject { get; set; }
    }
}