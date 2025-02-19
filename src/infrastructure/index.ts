import MongoDB from "./mongo/mongodb";
export default async function infrastructure() {
  const db = await MongoDB();
  console.log("🚀 MongoDB connected!");

  return { db };
}
