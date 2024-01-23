import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
	const { loading, request, error, clearError } = useHttp();

	const _apiBase = "https://gateway.marvel.com:443/v1/public/";
	const _apiKey = "apikey=882328e4822e076f9c7473a1cece504c";
	const _baseOffset = 210;

	const getAllCharacters = async (offset = _baseOffset) => {
		const res = await request(
			`http://localhost:5175/chars`
		);
		return res;
	};

	const addNewCharacter = async (name, description, image) => {
		console.log({
			"name": name,
			"description": description,
			"img": image
		});
		const res = await request(
			`http://localhost:5175/chars`, "POST",
			{
				"name": name,
				"description": description,
				"img": image
			}
		);
		console.log(res);
		return res;
	}

	const getCharacter = async (id) => {
		const res = await request(`http://localhost:5175/chars/${id}`);
		return res;
	};


	const getComic = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		return _transformComics(res.data.results[0]);
	}

	const getAllComics = async (offset = 0) => {
		const res = await request(`${_apiBase}comics?orderBy=-issueNumber&limit=8&offset=${offset}&${_apiKey}`)

		return res.data.results.map(_transformComics);
	}

	const _transformCharacter = (char) => {
		return {
			id: char.id,
			name: char.name,
			description: char.description
				? `${char.description.slice(0, 210)}...`
				: "There is no description for this character",
			thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
		};
	};


	const _transformComics = (comics) => {
		return {
			id: comics.id,
			title: comics.title,
			description: comics.description || "There is no description",
			pageCount: comics.pageCount
				? `${comics.pageCount} p.`
				: "No information about the number of pages",
			thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
			language: comics.textObjects[0]?.language || "en-us",
			price: comics.prices[0].price
				? `${comics.prices[0].price}$ `
				: "not available",
		};
	};
	

	return {
		loading,
		error,
		clearError,
		getAllCharacters,
		getCharacter,
		getAllComics,
		getComic,
		addNewCharacter
	};
};

export default useMarvelService;
