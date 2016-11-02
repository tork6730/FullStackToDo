using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using FullStackToDo.Data;
using FullStackToDo.Models;

namespace FullStackToDo.Controllers
{
    public class ToDoesController : ApiController
    {
        private ToDoesDataContext db = new ToDoesDataContext();

        // GET: api/ToDoes
        public IQueryable<ToDo> GetToDoes()
        {
            return db.ToDoes;
        }

        // GET: api/ToDoes/5
        [ResponseType(typeof(ToDo))]
        public IHttpActionResult GetToDo(int id)
        {
            ToDo toDo = db.ToDoes.Find(id);
            if (toDo == null)
            {
                return NotFound();
            }

            return Ok(toDo);
        }

        // PUT: api/ToDoes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutToDo(int id, ToDo toDo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != toDo.ToDoID)
            {
                return BadRequest();
            }

            db.Entry(toDo).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ToDoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/ToDoes
        [ResponseType(typeof(ToDo))]
        public IHttpActionResult PostToDo(ToDo toDo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ToDoes.Add(toDo);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = toDo.ToDoID }, toDo);
        }

        // DELETE: api/ToDoes/5
        [ResponseType(typeof(ToDo))]
        public IHttpActionResult DeleteToDo(int id)
        {
            ToDo toDo = db.ToDoes.Find(id);
            if (toDo == null)
            {
                return NotFound();
            }

            db.ToDoes.Remove(toDo);
            db.SaveChanges();

            return Ok(toDo);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ToDoExists(int id)
        {
            return db.ToDoes.Count(e => e.ToDoID == id) > 0;
        }
    }
}