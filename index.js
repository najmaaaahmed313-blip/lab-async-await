const postsUrl = "https://jsonplaceholder.typicode.com/posts";

function displayPosts(posts) {
	const postList = document.querySelector("#post-list");
	const postElements = document.createDocumentFragment();

	posts.forEach((post) => {
		const listItem = document.createElement("li");
		const title = document.createElement("h1");
		const body = document.createElement("p");

		title.textContent = post.title;
		body.textContent = post.body;
		listItem.append(title, body);
		postElements.append(listItem);
	});

	postList.replaceChildren(postElements);
}

async function fetchPosts() {
	const postStatus = document.querySelector("#post-status");

	try {
		const response = await fetch(postsUrl);
		if (!response.ok) {
			throw new Error(`Post request failed with status ${response.status}`);
		}

		const posts = await response.json();
		displayPosts(posts);
		postStatus.textContent = posts.length === 0 ? "No posts available." : "";
	} catch (error) {
		postStatus.textContent = "Unable to load posts. Please try again later.";
	}
}

fetchPosts();
