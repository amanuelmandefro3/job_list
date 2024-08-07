export async function getData() {
  
  const res = await fetch("https://akil-backend.onrender.com/opportunities/search", { method: "GET" });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
}


export async function getJobById(id:string) {
  const res = await fetch(`https://akil-backend.onrender.com/opportunities/${id}`, { method: "GET" });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
}