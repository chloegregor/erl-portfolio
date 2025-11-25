
export function EditForm({ id, title, description }: { id: number; title: string; description: string }) {
  return (
    <form action="/api/work" method="POST">
                <input type="hidden" name="id" value={id} />
                <input type="hidden" name="_method" value="PUT" />
                <div>
                  <label htmlFor={`title-${id}`}>Title:</label>
                  <input
                    type="text"
                    className="border"
                    id={`title-${id}`}
                    name="titre"
                    defaultValue={title}
                    required
                  />
                </div>
                <div>
                  <label htmlFor={`description-${id}`}>Description:</label>
                  <textarea
                    className="border"
                    id={`description-${id}`}
                    name="description"
                    defaultValue={description}
                    required
                  ></textarea>
                </div>
                <div>
                  <button type="submit">Update Work</button>
                </div>
              </form>
  )
}
