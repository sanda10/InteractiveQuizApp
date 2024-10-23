export async function fetchQuizData() {
  try {
    const response = await fetch("/data/questions.json");
    if (!response.ok) {
      throw new Error(
        `Failed to fetch quiz data: ${response.status} ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching quiz data:", error.message);
    throw error;
  }
}
