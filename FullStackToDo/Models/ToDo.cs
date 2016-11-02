using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FullStackToDo.Models
{
    public class ToDo
    {
        public int ToDoID { get; set; }

        public string ToDoItem { get; set; }
        public int ToDoPriority { get; set; }
    }
}