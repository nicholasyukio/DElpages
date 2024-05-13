const fs = require('fs-extra');
const xml = require('xml');

class SitemapWriter {
	constructor({ outFile, host }) {
		this.outFile = outFile
	}

	async writeSitemap(pages) {
		// Construct the XML object
		const xmlObject = {
			urlset: [
				// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
				{
					_attr: {
						xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
					},
				},

				// For every page of the site, generate a <url> object
				...pages.map((page) => {
                    let priority = 0.5;

                    if (page.href.includes('espera-dominio-eletrico')) {
                        priority = 1.0;
                    }
                    if (page.href.includes('direto-dominio-eletrico')) {
                        priority = 1.0;
                    }
                    if (page.href.includes('watch')) {
                        priority = 0.8;
                    }
                    if (page.href.includes('feed')) {
                        priority = 0.8;
                    }
                    if (page.href.includes('playlist')) {
                        priority = 0.8;
                    }
                    if (page.href.includes('termosdeuso')) {
                        priority = 0.1;
                    }
                    if (page.href.includes('politicadeprivacidade')) {
                        priority = 0.1;
                    }

					return {
						// <url>
						url: [
							// <loc>http://www.example.com/</loc>
							{ loc: page.href },

							// <lastmod>2005-01-01</lastmod>
							{ lastmod: page.srcFileLastModifiedAt },

							// <changefreq>monthly</changefreq>
							{ changefreq: 'monthly' },

							// <priority>0.8</priority>
							{ priority: priority },
						],
					}
				}),
			],
		}

		// Generate the XML markup
		const xmlString = xml(xmlObject)

		// Write the file to disk
		await fs.writeFile(this.outFile, '<?xml version="1.0" encoding="UTF-8"?>' + xmlString)
	}
}

const getRecommendations = (playlistId) => {
    try {
        // Make a GET request to fetch recommendations
        return fetch(`https://dominioeletrico.com.br:5000/playlist/${playlistId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                return data;
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    } catch (error) {
        console.error('Error:', error);
    }
};

/* const getRecommendations = async (playlistId) => {
    try {
        // Make a GET request to fetch recommendations
        const response = await fetch(`https://dominioeletrico.com.br:5000/playlist/${playlistId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}; */

const base_domain = "https://dominioeletrico.com.br";

const base_unique_pages = 
[
    "/",
    "/espera-dominio-eletrico",
    "/direto-dominio-eletrico",
    "/politicadeprivacidade",
    "/termosdeuso",
    "/oferta",
    "/login",
    "/feed",
    "/signup",
    "/logon",
    "/verify",
    "/recover"
];

const availablePlaylists = [
    {id: "3f128956-5e89-410b-8072-203b8d266390", name: "Multivibrador Astável", num_videos: 6, thumbnail_url: "playlist_multivibrador_astavel_thumbnail.jpg"},
    {id: "c385ae61-4635-4ef2-a76f-6762dce1ac2d", name: "Vídeos de experimentos", num_videos: 22, thumbnail_url: "playlist_experimentos_thumbnail.jpg"},
    {id: "7748272c-0827-4672-b875-d0c518d53575", name: "Exercícios Resolvidos - 2020", num_videos: 40, thumbnail_url: "playlist_exercicios_resolvidos_2020_thumbnail.jpg"},
    {id: "a63b2748-daaf-4e68-bd35-a0c6d5453b64", name: "Exercícios Resolvidos - 2022", num_videos: 43, thumbnail_url: "playlist_exercicios_resolvidos_2022_thumbnail.jpg"},
    {id: "bb29f908-2f6f-43cf-a044-6fb1c4a6c02b", name: "Exercícios Resolvidos - 2023", num_videos: 35, thumbnail_url: "playlist_exercicios_resolvidos_2023_thumbnail.jpg"},
    {id: "15d46305-b813-4b0c-89f1-f0eb5b003ce5", name: "Erros Elétricos", num_videos: 15, thumbnail_url: "playlist_erros_eletricos_thumbnail.jpg"},
    {id: "ba37a8c8-f3b6-44b2-a1bb-07cdef9085f3", name: "Aulas Longas de Circuitos Elétricos", num_videos: 13, thumbnail_url: "playlist_aulas_longas_thumbnail.jpg"}
];

let pages = [];

for (let k = 0; k < base_unique_pages.length; k++) {
    pages.push({"href": `${base_domain}${base_unique_pages[k]}`, "srcFileLastModifiedAt": "2024-05-13"});
}

// Create an array to store all promises returned by getRecommendations
const promises = [];

// Iterate over availablePlaylists
for (let i = 0; i < availablePlaylists.length; i++) {
    console.log(availablePlaylists[i].id);
    
    // Call getRecommendations for each playlist and push the promise to the promises array
    promises.push(
        getRecommendations(availablePlaylists[i].id)
            .then(data => {
                pages.push({"href": `${base_domain}/playlist?id=${availablePlaylists[i].id}`, "srcFileLastModifiedAt": "2024-05-13"});
                for (let j = 0; j < data.length; j++) {
                    let video = data[j];
                    console.log(video["id"]);
                    pages.push({"href": `${base_domain}/watch?v=${video["id"]}`, "srcFileLastModifiedAt": "2024-05-13"});
                }
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            })
    );
}

// Wait for all promises to resolve
Promise.all(promises)
    .then(() => {
        // All asynchronous operations have completed
        // Display the pages array
        console.log(pages);
        console.log(`Number of pages: ${pages.length}`);

        // Create an instance of SitemapWriter
        const writer = new SitemapWriter({ outFile: 'sitemap.xml' });

        // Invoke the writeSitemap method with the pages array
        writer.writeSitemap(pages)
        .then(() => {
            console.log('Sitemap generated successfully!');
        })
        .catch((error) => {
            console.error('Error generating sitemap:', error);
        });
    })
    .catch(error => {
        // Handle any errors
        console.error(error);
    });



console.log(`Number of pages: ${pages.length}`);
    
    
