**Tableland Available API Endpoints**
----
**Foreword**

* All URLs for endpoints will be displayed as they will look in production (api.roadmaps.mesa.org). To consume the endpoints in your local environment (once they are merged), you must change the hostname portion of the URL to api.roadmaps.lvh.me:5000
* Anytime you see a ... symbol being used, it indicates that the payload continues in a similar fashion.
* Certain field data types and response payload association inclusions are subject to change.
* If the current user is a super admin and the payload contains a user resource at any level, the user resource will contain an extra attribute specifying their email

**1. [super_admin only] Get all users with optional query params on visible and/or role**

* **URLs:**	
  
  - **GET** `api.roadmaps.mesa.org/v1/users`
  - **GET** `api.roadmaps.mesa.org/v1/users?role={string}`
  - **GET** `api.roadmaps.mesa.org/v1/users?visible={boolean}`
  - **GET** `api.roadmaps.mesa.org/v1/users?visible={boolean}&role={string}`

* **Notes:**
  
  - The exclusion of both optional query params will result in all existing users in the payload.
  - When retrieving a collection of users, the following associations are included in the payload:
	* None  

* **Example Success Response:**
  
  - **Status Code:** 200 
  - **Content:** <br />
  ```javascript
  	{
		"users": [
			{
	            "id": 1,
	            "type": "User",
	            "first_name": "Houston",
	            "last_name": "Rodriguez",
	            "description": "Consequatur officiis magni. Illo autem aspernatur voluptas cumque qui perspiciatis. Molestiae qui sequi. Molestiae quibusdam odio aut corrupti quasi aperiam animi.",
	            "contact_url": "http://daugherty.co/kendra.price",
	            "main_title": "Mathematician",
	            "main_location": "DuPont",
	            "role": "user",
	            "visible": true,
	            "link": "http://api.roadmaps.lvh.me:5000/v1/users/3",
	            "email": "bernadette.bogisich@example.org"
	        },
	        {
	            "id": 2,
	            "type": "User",
	            "first_name": "Justyn",
	            "last_name": "Schaden",
	            "description": "Velit ratione dolorum rerum voluptas rerum at. Nobis voluptate amet ut qui quasi et est. Molestiae beatae deleniti harum nemo. Facilis eveniet quo repudiandae. Animi error consequatur.",
	            "contact_url": "http://grantbeatty.org/michelle",
	            "main_title": "Conservation Scientist",
	            "main_location": "Icelyn TAFE",
	            "role": "user",
	            "visible": true,
	            "link": "http://api.roadmaps.lvh.me:5000/v1/users/4",
	            "email": "prince.wilkinson@example.net"
	        },
			{
				"id": 3,
				"type": "User",
				"first_name": "Griffin",
				...
			}
		]
	}
  ```
  <br />
  
**2. Get a specific user based on the ID provided in the path param**

* **URL:**	
  
  - **GET** `api.roadmaps.mesa.org/v1/users/{id}`

* **Notes:**
  
  - When retrieving a specific user, the following associations are included in the payload:
    * Media
    * Experiences
    * Organization and its media within an experience
    * Program and its media within an experience

* **Example Success Response:**
  
  - **Status Code:** 200 
  - **Content:** <br />
  ```javascript
  	{
	    "user": {
	        "id": 3,
	        "type": "User",
	        "first_name": "Houston",
	        "last_name": "Rodriguez",
	        "description": "Consequatur officiis magni. Illo autem aspernatur voluptas cumque qui perspiciatis. Molestiae qui sequi. Molestiae quibusdam odio aut corrupti quasi aperiam animi.",
	        "contact_url": "http://daugherty.co/kendra.price",
	        "main_title": "Mathematician",
	        "main_location": "DuPont",
	        "role": "user",
	        "visible": true,
	        "link": "http://api.roadmaps.lvh.me:5000/v1/users/3",
	        "media": [
	            {
	                "id": 5,
	                "type": "Medium",
	                "category": "image",
	                "description": "Ut aut voluptas minus porro eveniet delectus.",
	                "url": "http://lorempixel.com/100/100/people",
	                "link": "http://api.roadmaps.lvh.me:5000/v1/users/3/media/5"
	            },
	            {
	                "id": 6,
	                "type": "Medium",
	                "category": "video",
	                "description": "Autem porro suscipit est incidunt.",
	                "url": "https://www.youtube.com/watch?v=oa2_Nn0_h0Q",
	                "link": "http://api.roadmaps.lvh.me:5000/v1/users/3/media/6"
	            }
	        ],
	        "experiences": [
	            {
	                "id": 11,
	                "type": "Experience",
	                "start_date": "2017-03-11T22:56:04.499Z",
	                "end_date": null,
	                "title": "Mathematician",
	                "award": "Doctor of Computational Science",
	                "current": true,
	                "link": "http://api.roadmaps.lvh.me:5000/v1/users/3/experiences/11",
	                "organization": {
	                    "id": 2,
	                    "type": "Organization",
	                    "name": "DuPont",
	                    "description": "Tenetur illo deleniti id quis in. Ut dolor eum itaque. Et qui aliquam laboriosam qui. Facere tenetur porro culpa qui adipisci occaecati. Consectetur est facere vero adipisci quidem voluptas.",
	                    "url": "http://pfannerstill.co/tod.tromp",
	                    "address_line_1": "2238 Valentine Pike",
	                    "address_line_2": "Suite 790",
	                    "address_line_3": null,
	                    "city": "Kozeybury",
	                    "state": "TX",
	                    "postal_code": "34450-7526",
	                    "country": "Bermuda",
	                    "lat": "-18.184855",
	                    "lng": "38.479448",
	                    "visible": true,
	                    "link": "http://api.roadmaps.lvh.me:5000/v1/organizations/2",
	                    "media": [
	                        {
	                            "id": 103,
	                            "type": "Medium",
	                            "category": "image",
	                            "description": "Et et impedit dolores itaque ut id.",
	                            "url": "http://lorempixel.com/100/100/business",
	                            "link": "http://api.roadmaps.lvh.me:5000/v1/organizations/2/media/103"
	                        },
	                        {
	                            "id": 104,
	                            "type": "Medium",
	                            "category": "video",
	                            "description": "Ut dolore totam eos exercitationem minus.",
	                            "url": "https://www.youtube.com/watch?v=j97MuROR64U",
	                            "link": "http://api.roadmaps.lvh.me:5000/v1/organizations/2/media/104"
	                        }
	                    ]
	                }
	            },
	            {
	                "id": 12,
	                "type": "Experience",
	                "start_date": "2018-03-11T22:56:04.506Z",
	                "end_date": "2018-03-11T22:56:04.506Z",
	                "title": "Volunteer",
	                "award": null,
	                "current": false,
	                "link": "http://api.roadmaps.lvh.me:5000/v1/users/3/experiences/12",
	                "parent_organization": 34,
	                "program": {
	                    "id": 16,
	                    "type": "Program",
	                    "name": "Fortran Club",
	                    "description": "Perferendis quia et et. Autem facere reiciendis minima rerum error magnam. Repellat corporis eum et quia nemo. Sequi dolore cupiditate.",
	                    "url": "http://stokescasper.info/uriah",
	                    "visible": true,
	                    "link": "http://api.roadmaps.lvh.me:5000/v1/programs/16",
	                    "parent_organization_names": [
	                        [
	                            "Graphic Packaging International",
	                            "382 Willy Valleys",
	                            "Suite 604"
	                        ]
	                    ],
	                    "media": [
	                        {
	                            "id": 161,
	                            "type": "Medium",
	                            "category": "image",
	                            "description": "Et animi sint corrupti totam.",
	                            "url": "http://lorempixel.com/100/100/technics",
	                            "link": "http://api.roadmaps.lvh.me:5000/v1/programs/16/media/161"
	                        },
	                        {
	                            "id": 162,
	                            "type": "Medium",
	                            "category": "video",
	                            "description": "Quisquam ab enim itaque saepe.",
	                            "url": "https://www.youtube.com/watch?v=w4PUNmPm884",
	                            "link": "http://api.roadmaps.lvh.me:5000/v1/programs/16/media/162"
	                        }
	                    ]
	                }
	            }
	        ]
	    }
	}
  ```
  <br />
  
**3. Update a specific user based on the ID provided in the path param and the contents of the post body**

* **URL:**	
  
  - **PUT/PATCH** `api.roadmaps.mesa.org/v1/users/{id}`

* **Notes:**
  
  - This endpoint will be used by regular users, admins, and the super_admin. Consequently, only certain fields will be allowed based on the role of the user making the request.
  - For users and admins, any of their basic profile attributes can be updated (first_name, description, etc.) as long as their user id matches the id provided in the path param.
  - For the super_admin, they may update any attribute including 'visible' and 'role' for any specified user. 
  - When responding with the updated user, the following associations are included in the payload:
  	* None

* **Example Request Payload:**
  ```javascript
  	{
		"description": "Freshly updated"
	}
  ```

* **Example Success Response:**
  
  - **Status Code:** 200 
  - **Content:** <br />
  ```javascript
  	{
	    "user": {
	        "id": 3,
	        "type": "User",
	        "first_name": "Houston",
	        "last_name": "Rodriguez",
	        "description": "Freshly updated",
	        "contact_url": "http://daugherty.co/kendra.price",
	        "main_title": "Mathematician",
	        "main_location": "DuPont",
	        "role": "user",
	        "visible": true,
	        "link": "http://api.roadmaps.lvh.me:5000/v1/users/3"
	    }
	}
  ```
  <br />
  
**4. Delete a specific user based on the ID provided in the path param**

* **URL:**	
  
  - **DELETE** `api.roadmaps.mesa.org/v1/users/{id}`

* **Notes:**
  
  - The delete will only be successful if the ID of the current user matches the ID in the path param.
  - A successful delete will respond with success code 200 and the resource that was just deleted.

* **Example Success Response:**
  
  - **Status Code:** 200 
  - **Content:** <br />
  ```javascript
  	{
	    "user": {
	        "id": 3,
	        "type": "User",
	        "first_name": "Houston",
	        "last_name": "Rodriguez",
	        "description": "Freshly updated",
	        "contact_url": "http://daugherty.co/kendra.price",
	        "main_title": "Mathematician",
	        "main_location": "DuPont",
	        "role": "user",
	        "visible": true,
	        "link": "http://api.roadmaps.lvh.me:5000/v1/users/3"
	    }
	}
  ```
  <br />
  
**5. [admin and super_admin only] Get all admin permissions for a user based on the ID specified in the path param**

* **URL:**	
  
  - **GET** `api.roadmaps.mesa.org/v1/users/{id}/permissions`

* **Notes:**
  
  - If the current user has role of regular user, reject
  - If the current user has role of admin and their ID matches the ID specified in the path param, they will receive their permission lists. Otherwise, the request will be rejected.
  - If the current user has role of super_admin and their ID matches the ID specified in the path param, all organizations and programs will be returned. Otherwise, the permission lists of the user specified by the ID in the path param will be returned.

* **Example Success Response:**
  
  - **Status Code:** 200 
  - **Content:** <br />
  ```javascript
  	{
	    "permissions": {
	        "organizations": [
	            {
	                "id": 1,
	                "type": "Organization",
	                "name": "Exelon Corporation",
	                "description": "Porro aperiam at rerum fugiat. Error porro voluptates. Inventore et recusandae molestias. Vel dolores maxime iste. Aut pariatur aut omnis alias.",
	                "url": "http://klockochristiansen.info/zoie_jenkins",
	                "address_line_1": "8571 Beier Loop",
	                "address_line_2": "Apt. 394",
	                "address_line_3": null,
	                "city": "VonRuedenbury",
	                "state": "OH",
	                "postal_code": "42906-1205",
	                "country": "Rwanda",
	                "lat": "67.260591",
	                "lng": "37.432537",
	                "visible": false,
	                "link": "http://api.roadmaps.lvh.me:5000/v1/organizations/1"
	            }
	        ],
	        "programs": [
	            {
	                "id": 7,
	                "type": "Program",
	                "name": "Fortran Club",
	                "description": "Magni non alias dignissimos nisi corporis. Qui suscipit quas. Ipsum animi non dolores recusandae perspiciatis sunt eligendi. Aut quaerat non explicabo aliquam.",
	                "url": "http://mcdermott.io/marta.hansen",
	                "visible": false,
	                "link": "http://api.roadmaps.lvh.me:5000/v1/programs/7",
	                "parent_organization_names": [
	                    [
	                        "Xcel Energy",
	                        "52323 Maureen Mountains",
	                        "Apt. 628"
	                    ]
	                ]
	            }
	        ]
	    }
	}
  ```
  <br />
  
**6. Get a random visible user**

* **URL:**	
  
  - **GET** `api.roadmaps.mesa.org/v1/users/random`

* **Notes:**
  
  - When responding with the random user, the following associations are included in the payload:
    * Media
    * Experiences
    * Organization and its media within an experience
    * Program and its media within an experience

* **Example Success Response:**
  
  - **Status Code:** 200 
  - **Content:** <br />
  ```
  See #2 payload, structure will be the same
  ```
  <br />
  
**7. Get a specific organization based on the ID provided in the path param**

* **URL:**	
  
  - **GET** `api.roadmaps.mesa.org/v1/organizations/{id}`

* **Notes:**
  
  - When responding with the organization, the following associations are included in the payload:
    * Media
    * Users and their media
    * Sponsored programs and their media

* **Example Success Response:**
  
  - **Status Code:** 200 
  - **Content:** <br />
  ```javascript
  	{
	    "organization": {
	        "id": 6,
	        "type": "Organization",
	        "name": "Xcel Energy",
	        "description": "Quas eos impedit doloribus. Aperiam vitae rerum laudantium. Odio nesciunt aut cum eveniet. Illo maiores architecto.",
	        "url": "http://dicki.org/carmella",
	        "address_line_1": "52323 Maureen Mountains",
	        "address_line_2": "Apt. 628",
	        "address_line_3": null,
	        "city": "New Bertram",
	        "state": "NV",
	        "postal_code": "28541",
	        "country": "Armenia",
	        "lat": "-70.45068",
	        "lng": "11.750684",
	        "visible": true,
	        "link": "http://api.roadmaps.lvh.me:5000/v1/organizations/6",
	        "media": [
	            {
	                "id": 111,
	                "type": "Medium",
	                "category": "image",
	                "description": "Perspiciatis ut odit et.",
	                "url": "http://lorempixel.com/100/100/business",
	                "link": "http://api.roadmaps.lvh.me:5000/v1/organizations/6/media/111"
	            },
	            {
	                "id": 112,
	                "type": "Medium",
	                "category": "video",
	                "description": "Fugit consequatur veritatis voluptate.",
	                "url": "https://www.youtube.com/watch?v=j97MuROR64U",
	                "link": "http://api.roadmaps.lvh.me:5000/v1/organizations/6/media/112"
	            }
	        ],
	        "users": [
	            {
	                "id": 21,
	                "type": "User",
	                "first_name": "Melvina",
	                "last_name": "Willms",
	                "description": "Eos sunt adipisci dolor cum quia ullam tempora. Voluptatem et et ut. Accusantium id aliquid. Consequatur molestias quo inventore voluptatem. Quos consequatur blanditiis amet.",
	                "contact_url": "http://bergstromveum.co/maude",
	                "main_title": "Hydrologist",
	                "main_location": "Xcel Energy",
	                "role": "user",
	                "visible": true,
	                "link": "http://api.roadmaps.lvh.me:5000/v1/users/21",
	                "media": [
	                    {
	                        "id": 41,
	                        "type": "Medium",
	                        "category": "image",
	                        "description": "A labore impedit ducimus sint iure laboriosam magni voluptatem.",
	                        "url": "http://lorempixel.com/100/100/people",
	                        "link": "http://api.roadmaps.lvh.me:5000/v1/users/21/media/41"
	                    },
	                    {
	                        "id": 42,
	                        "type": "Medium",
	                        "category": "video",
	                        "description": "Commodi nulla doloribus molestiae voluptate sunt.",
	                        "url": "https://www.youtube.com/watch?v=oa2_Nn0_h0Q",
	                        "link": "http://api.roadmaps.lvh.me:5000/v1/users/21/media/42"
	                    }
	                ]
	            },
	            {
	                "id": 31,
	                "type": "User",
	                "first_name": "Weldon",
	                "last_name": "Herzog",
	                "description": "A sit labore culpa et ex distinctio. Nihil velit laudantium blanditiis. Dolor ut nisi error voluptas officia omnis. Suscipit aliquam possimus. Quia occaecati eos reprehenderit natus officia veniam.",
	                "contact_url": "http://windler.com/emmanuel.champlin",
	                "main_title": "Health and Safety Engineer",
	                "main_location": "Xcel Energy",
	                "role": "user",
	                "visible": true,
	                "link": "http://api.roadmaps.lvh.me:5000/v1/users/31",
	                "media": [
	                    {
	                        "id": 61,
	                        "type": "Medium",
	                        "category": "image",
	                        "description": "Hic iure adipisci voluptatem nisi suscipit nam.",
	                        "url": "http://lorempixel.com/100/100/people",
	                        "link": "http://api.roadmaps.lvh.me:5000/v1/users/31/media/61"
	                    },
	                    {
	                        "id": 62,
	                        "type": "Medium",
	                        "category": "video",
	                        "description": "Ut quasi aut quidem consectetur.",
	                        "url": "https://www.youtube.com/watch?v=oa2_Nn0_h0Q",
	                        "link": "http://api.roadmaps.lvh.me:5000/v1/users/31/media/62"
	                    }
	                ]
	            }
	        ],
	        "sponsoring": [
	            {
	                "id": 1,
	                "type": "Program",
	                "name": "Javascript Club",
	                "description": "Blanditiis omnis qui facilis aperiam. Corporis non minima reprehenderit iusto fugit quibusdam. Nulla labore omnis id autem. Vitae voluptatem aut vero et aut odit. Quis unde dolorum perferendis esse excepturi.",
	                "url": "http://reingerschmitt.net/chaim",
	                "visible": true,
	                "link": "http://api.roadmaps.lvh.me:5000/v1/programs/1",
	                "parent_organization_names": [
	                    [
	                        "Xcel Energy",
	                        "52323 Maureen Mountains",
	                        "Apt. 628"
	                    ]
	                ],
	                "media": [
	                    {
	                        "id": 131,
	                        "type": "Medium",
	                        "category": "image",
	                        "description": "Esse dolores provident perferendis sint possimus rerum aut id.",
	                        "url": "http://lorempixel.com/100/100/technics",
	                        "link": "http://api.roadmaps.lvh.me:5000/v1/programs/1/media/131"
	                    },
	                    {
	                        "id": 132,
	                        "type": "Medium",
	                        "category": "video",
	                        "description": "Fugiat id velit velit sit.",
	                        "url": "https://www.youtube.com/watch?v=w4PUNmPm884",
	                        "link": "http://api.roadmaps.lvh.me:5000/v1/programs/1/media/132"
	                    }
	                ]
	            }
	        ]
	    }
	}
  ```
  <br />
  
**8. Create a new organization based on valid content in the post body**

* **URL:**	
  
  - **POST** `api.roadmaps.mesa.org/v1/organizations`

* **Notes:**
  
  - The creation will only be successful if the following fields are present and no longer than 50 characters:
    * name
    * address_line_1
    * address_line_2
    * city
    * country
    * lat
    * lng
  - More address information is encouraged if available.
  - The newly created organization will be returned with no associations

* **Example Request Payload:**
  ```javascript
  	{
		"organization": {
			"name": "Intel",
			"address_line_1": "123",
			"address_line_2": "SE Street Rd",
			"city": "Portland",
			"state": "Oregon",
			"postal_code": "97201",
			"country": "United States",
			"lat": 23.403944,
			"lng": 110.340392
		}
	}
  ```
  
* **Example Success Response:**
  
  - **Status Code:** 201 
  - **Content:** <br />
  ```javascript
  	{
	    "organization": {
	        "id": 62,
	        "type": "Organization",
	        "name": "Intel",
	        "description": null,
	        "url": null,
	        "address_line_1": "123",
	        "address_line_2": "SE Street Rd",
	        "address_line_3": null,
	        "city": "Portland",
	        "state": "Oregon",
	        "postal_code": "97201",
	        "country": "United States",
	        "lat": "23.403944",
	        "lng": "110.340392",
	        "visible": true,
	        "link": "http://api.roadmaps.lvh.me:5000/v1/organizations/62"
	    }
	}
  ```
  <br />
  
**9. [admin and super_admin only] Update a specific organization based on the ID provided in the path param and the valid contents of the request body**

* **URL:**	
  
  - **PUT/PATCH** `api.roadmaps.mesa.org/v1/organizations/{id}`

* **Notes:**
  
  - Checks will be made against the current user to ensure that they are at least an admin who is visible and has permission to edit the specified organization.
  - If the above checks pass, any organization attribute can be updated.
  - When responding with the updated organization, the following associations are included in the payload:
  	* None

* **Example Request Payload:**
  ```javascript
  	{
		"description": "Freshly updated",
		"url": "freshupdate.example"
	}
  ```
  
* **Example Success Response:**
  
  - **Status Code:** 201 
  - **Content:** <br />
  ```javascript
  	{
	    "organization": {
	        "id": 62,
	        "type": "Organization",
	        "name": "Intel",
	        "description": "Freshly updated",
	        "url": "freshupdate.example",
	        "address_line_1": "123",
	        "address_line_2": "SE Street Rd",
	        "address_line_3": null,
	        "city": "Portland",
	        "state": "Oregon",
	        "postal_code": "97201",
	        "country": "United States",
	        "lat": "23.403944",
	        "lng": "110.340392",
	        "visible": true,
	        "link": "http://api.roadmaps.lvh.me:5000/v1/organizations/62"
	    }
	}
  ```
  <br />
  
**10. Create a new program attached to an organization based on the ID provided in the path param and the valid content in the post body**

* **URL:**	
  
  - **POST** `api.roadmaps.mesa.org/v1/organizations/{organization_id}/programs`

* **Notes:**
  
  - Checks will be made against the current user to ensure that they are at least an admin who is visible and has permission to edit the specified organization.
  - If the above checks pass, any organization attribute can be updated.
  - When responding with the updated organization, the following associations are included in the payload:
  	* None

* **Example Request Payload:**
  ```javascript
  	{
		"description": "Freshly updated",
		"url": "freshupdate.example"
	}
  ```
  
* **Example Success Response:**
  
  - **Status Code:** 201 
  - **Content:** <br />
  ```javascript