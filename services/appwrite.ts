import { Client, ID, Query, TablesDB } from "react-native-appwrite";

const endpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;
const projectId = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const databaseId = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;

const client = new Client().setEndpoint(endpoint).setProject(projectId);
const tablesDb = new TablesDB(client);

export async function updateSearchCount(query: string, movie?: Movie) {
  if (!query?.trim() || !movie) {
    return;
  }

  try {
    const result = await tablesDb.listRows({
      databaseId,
      tableId: "metrics",
      queries: [Query.equal("searchTerm", query)],
      total: false,
    });

    if (result.rows.length > 0) {
      const existingMovie = result.rows[0];

      await tablesDb.updateRow({
        databaseId,
        tableId: "metrics",
        rowId: existingMovie.$id,
        data: {
          count: existingMovie.count + 1,
        },
      });
    } else {
      await tablesDb.createRow({
        databaseId,
        tableId: "metrics",
        rowId: ID.unique(),
        data: {
          searchTerm: query,
          movie_id: movie.id,
          title: movie.title,
          count: 1,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        },
      });
    }
  } catch (error) {
    console.warn("updateSearchCount response", error);
    throw error;
  }
}
