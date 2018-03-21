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
  
  - The creation will only be successful if the following fields are present:
    * valid organization ID in path param
    * name
  - The newly created program will be returned with no associations

* **Example Request Payload:**
  ```javascript
    {
        "program": {
            "name": "Robotics Club"
        }
    }
  ```
  
* **Example Success Response:**
  
  - **Status Code:** 201 
  - **Content:** <br />
  ```javascript
    {
        "program": {
            "id": 21,
            "type": "Program",
            "name": "Robotics Club",
            "description": null,
            "url": null,
            "visible": true,
            "link": "http://api.roadmaps.lvh.me:5000/v1/programs/21",
            "parent_organization_names": [
                [
                    "Intel",
                    "123",
                    "SE Street Rd"
                ]
            ]
        }
    }
  ```
  <br />
  
**11. Get a specific program based on the ID provided in the path param**

* **URL:**
  
  - **GET** `api.roadmaps.mesa.org/v1/programs/{id}`

* **Notes:**
  
  - When responding with the program, the following associations are included in the payload:
    * Media
    * Users and their media
    * Sponsor organizations and their media

* **Example Success Response:**
  
  - **Status Code:** 200
  - **Content:** <br />
  ```javascript
    {
        "program": {
            "id": 10,
            "type": "Program",
            "name": "Swift Club",
            "description": "Distinctio et aut dolorem non. Nostrum voluptatem doloribus libero. Soluta cupiditate quaerat ex placeat. Ullam ut ut aliquid ut odio. Et eos repellat quibusdam possimus aperiam vero.",
            "url": "http://bradtkeschumm.name/minnie.krajcik",
            "visible": true,
            "link": "http://api.roadmaps.lvh.me:5000/v1/programs/10",
            "parent_organization_names": [
                [
                    "Frontier Communications",
                    "29751 Juwan Track",
                    "Apt. 718"
                ]
            ],
            "media": [
                {
                    "id": 149,
                    "type": "Medium",
                    "category": "image",
                    "description": "Totam et eum est iure.",
                    "url": "http://lorempixel.com/100/100/technics",
                    "link": "http://api.roadmaps.lvh.me:5000/v1/programs/10/media/149"
                },
                {
                    "id": 150,
                    "type": "Medium",
                    "category": "video",
                    "description": "Sit nam aut enim eius id.",
                    "url": "https://www.youtube.com/watch?v=w4PUNmPm884",
                    "link": "http://api.roadmaps.lvh.me:5000/v1/programs/10/media/150"
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
                }
            ],
            "sponsors": [
                {
                    "id": 12,
                    "type": "Organization",
                    "name": "Frontier Communications",
                    "description": "Hic velit perferendis mollitia voluptas. Rerum adipisci quam aut sint aut optio. Labore beatae sed. Enim rem recusandae architecto est totam numquam dolor.",
                    "url": "http://jast.io/herman_kirlin",
                    "address_line_1": "29751 Juwan Track",
                    "address_line_2": "Apt. 718",
                    "address_line_3": null,
                    "city": "Billhaven",
                    "state": "WY",
                    "postal_code": "46046",
                    "country": "Norway",
                    "lat": "-62.423474",
                    "lng": "-140.552013",
                    "visible": true,
                    "link": "http://api.roadmaps.lvh.me:5000/v1/organizations/12",
                    "media": [
                        {
                            "id": 123,
                            "type": "Medium",
                            "category": "image",
                            "description": "Aut illum sapiente adipisci ea magni eaque animi.",
                            "url": "http://lorempixel.com/100/100/business",
                            "link": "http://api.roadmaps.lvh.me:5000/v1/organizations/12/media/123"
                        },
                        {
                            "id": 124,
                            "type": "Medium",
                            "category": "video",
                            "description": "Et quia ipsum hic illo velit quia quasi ut.",
                            "url": "https://www.youtube.com/watch?v=j97MuROR64U",
                            "link": "http://api.roadmaps.lvh.me:5000/v1/organizations/12/media/124"
                        }
                    ]
                }
            ]
        }
    }
  ```
  <br />
  
**12. [admin and super_admin only] Update a specific program based on the ID provided in the path param and the valid contents of the request body**

* **URL:**
  
  - **PUT/PATCH** `api.roadmaps.mesa.org/v1/programs/{id}`

* **Notes:**
  
  - Checks will be made against the current user to ensure that they are at least an admin who is visible and has permission to edit the specified program.
  - If the above checks pass, any program attribute can be updated.
  - When responding with the updated program, the following associations are included in the payload:
    * None
    
* **Example Request Payload:**
  ```javascript
    {
        "description": "Freshly updated",
        "url": "freshupdate.example"
    }
  ```
  
* **Example Success Response:**
  
  - **Status Code:** 200 
  - **Content:** <br />
  ```javascript
    {
        "program": {
            "id": 21,
            "type": "Program",
            "name": "Robotics Club",
            "description": "Freshly updated",
            "url": "freshupdate.example",
            "visible": true,
            "link": "http://api.roadmaps.lvh.me:5000/v1/programs/21",
            "parent_organization_names": [
                [
                    "Intel",
                    "123",
                    "SE Street Rd"
                ]
            ]
        }
    }
  ```
  <br />
  
**13. [admin super_admin only] Specify an existing user as an admin for an existing organization based on the ID provided in the path param and the valid content of the request body**

* **URL:**
  
  - **POST** `api.roadmaps.mesa.org/v1/organizations/{organization_id}/permissions`

* **Notes:**
  
  - The current user must be at least an admin who has permission for the organization with the ID specified by the path param. If these are true, then the request body must contain an email that matches a currently existing user.
  - If the current user is a super_admin, they can add a user as an admin to any organization by including either an email or a user_id in the request body for a currently existing user.
  - If a user is found for either of the attributes specified in the request body, they will have their role upgraded to admin if they were not already one.
  - Upon successful permission assignment, the details of the admin will be returned.
    
* **Example Request Payload:**
  ```javascript
    {
        "user_id": 1
    }
    or
    {
        "email": "admin@example.com" 
    }
  ```

* **Example Success Response:**
  
  - **Status Code:** 201 
  - **Content:** <br />
  ```javascript
    {
        "user": {
            "id": 2,
            "type": "User",
            "first_name": "admin",
            "last_name": "admin",
            "description": "test administrator",
            "contact_url": "asdf.com",
            "main_title": "Marine Engineer",
            "main_location": "High Pass Association",
            "role": "admin",
            "visible": true,
            "link": "http://api.roadmaps.lvh.me:5000/v1/users/2"
        }
    }
  ```
  <br />
  
**14. [admin and super_admin only] Specify an existing user as an admin for an existing program based on the ID provided in the path param and the valid content of the request body**

* **URL:**
  
  - **POST** `api.roadmaps.mesa.org/v1/programs/{program_id}/permissions`

* **Notes:**
  
  - The current user must be at least an admin who has permission for the program with the ID specified by the path param. If these are true, then the request body must contain an email that matches a currently existing user.
  - If the current user is a super_admin, they can add a user as an admin to any program by including either an email or a user_id in the request body for a currently existing user.
  - If a user is found for either of the attributes specified in the request body, they will have their role upgraded to admin if they were not already one.
  - Upon successful permission assignment, the details of the admin will be returned.
    
* **Example Request Payload:**
  ```javascript
    {
        "user_id": 1
    }
    or
    {
        "email": "admin@example.com" 
    }
  ```

* **Example Success Response:**
  
  - **Status Code:** 201 
  - **Content:** <br />
  ```javascript
    {
        "user": {
            "id": 2,
            "type": "User",
            "first_name": "admin",
            "last_name": "admin",
            "description": "test administrator",
            "contact_url": "asdf.com",
            "main_title": "Marine Engineer",
            "main_location": "High Pass Association",
            "role": "admin",
            "visible": true,
            "link": "http://api.roadmaps.lvh.me:5000/v1/users/2"
        }
    }
  ```
  <br />
  
**15. Create a new medium for a mediable parent (user/organization/program) based on the ID provided in the path param and the valid content of the post body**

* **URLs:**
  
  - **POST** `api.roadmaps.mesa.org/v1/users/{user_id}/media`
  - **POST** `api.roadmaps.mesa.org/v1/organizations/{organization_id}/media`
  - **POST** `api.roadmaps.mesa.org/v1/programs/{program_id}/media`

* **Notes:**
  
  - Since these endpoints all route to the same action, the action will be used by regular users, admins, and the super_admin. Consequently, restrictions will be made based on what type of ID is found in the path param.
  - If the creation is for a user, the ID of the current user must match the user ID provided in the path param. If the creation is for a program or organization, the current user must either be an admin with permissions for the program or organization or be the super_admin.
  - The creation will only be successful if the following fields are present:
    * valid parent ID in path param
    * category (provided by FE, not by user)
    * url
  - The creation is also contingent on the parent not already containing two media items.
  - The specified category must be either "image" or "video". If it's "image", the host for the URL must be media.licdn.com and the scheme must be https. If it's "video", the host for the URL must be www.youtube.com and the scheme must be https.
  - The newly created medium will be returned with no associations
    
* **Example Request Payload:**
  ```javascript
    {
        "medium": {
            "category": "video",
            "url": "https://www.youtube.com/watch?v=xRbNB5VopMM"
        }
    }
  ```

* **Example Success Response:**
  
  - **Status Code:** 201 
  - **Content:** <br />
  ```javascript
    {
        "medium": {
            "id": 241,
            "type": "Medium",
            "category": "video",
            "description": null,
            "url": "https://www.youtube.com/watch?v=xRbNB5VopMM",
            "link": "http://api.roadmaps.lvh.me:5000/v1/programs/21/media/241"
        }
    }
  ```
  <br />
  
**16. Update a specific medium for a mediable parent (user/organization/program) based on the IDs provided in the path params and the valid contents of the request body**

* **URLs:**
  
  - **PUT/PATCH** `api.roadmaps.mesa.org/v1/users/{user_id}/media/{id}`
  - **PUT/PATCH** `api.roadmaps.mesa.org/v1/organizations/{organization_id}/media/{id}`
  - **PUT/PATCH** `api.roadmaps.mesa.org/v1/programs/{program_id}/media/{id}`

* **Notes:**
  
  - Since these endpoints all route to the same action, the action will be used by regular users, admins, and the super_admin. Consequently, restrictions will be made based on what type of ID is found in the path param.
  - If the update is for a user, the ID of the current user must match the user ID provided in the path param. If the update is for a program or organization, the current user must either be an admin with permissions for the program or organization or be the super_admin.
  - Only the url field can be updated
  - The same rules apply for the URL as specified above in the notes for the create endpoint (#15).
  - When responding with the updated medium, the following associations are included in the payload:
    * None
    
* **Example Request Payload:**
  ```javascript
    {
        "url": "https://www.youtube.com/watch?v=iRZ2Sh5-XuM"
    }
  ```

* **Example Success Response:**
  
  - **Status Code:** 200 
  - **Content:** <br />
  ```javascript
    {
        "medium": {
            "id": 241,
            "type": "Medium",
            "category": "video",
            "description": null,
            "url": "https://www.youtube.com/watch?v=iRZ2Sh5-XuM",
            "link": "http://api.roadmaps.lvh.me:5000/v1/programs/21/media/241"
        }
    }
  ```
  <br />
  
**17. Delete a specific medium for a mediable parent (user/organization/program) based on the IDs provided in the path params**

* **URLs:**
  
  - **DELETE** `api.roadmaps.mesa.org/v1/users/{user_id}/media/{id}`
  - **DELETE** `api.roadmaps.mesa.org/v1/organizations/{organization_id}/media/{id}`
  - **DELETE** `api.roadmaps.mesa.org/v1/programs/{program_id}/media/{id}`

* **Notes:**
  
  - Since these endpoints all route to the same action, the action will be used by regular users, admins, and the super_admin. Consequently, restrictions will be made based on what type of ID is found in the path param.
  - If the delete is for a user, the ID of the current user must match the user ID provided in the path param. If the delete is for a program or organization, the current user must either be an admin with permissions for the program or organization or be the super_admin.
  - A successful delete will respond with success code 200 and the resource that was just deleted.

* **Example Success Response:**
  
  - **Status Code:** 200 
  - **Content:** <br />
  ```javascript
    {
        "medium": {
            "id": 241,
            "type": "Medium",
            "category": "video",
            "description": null,
            "url": "https://www.youtube.com/watch?v=iRZ2Sh5-XuM",
            "link": "http://api.roadmaps.lvh.me:5000/v1/programs/21/media/241"
        }
    }
  ```
  <br />
  
**18. Create a new experience for a user parent based on the ID provided in the path param and the valid content of the post body**

* **URL:**
  
  - **POST** `api.roadmaps.mesa.org/v1/users/{user_id}/experiences`

* **Notes:**
  
  - Since the creation of a new experience for a user can either be related to a program or an organization, an ID for either one of these entities must be present in the request body, but they must not both be present at the same time. 
  - If the experience is related to a program, then a valid parent_org field is required, specifying the ID of the parent organization that the program experience was created under. This ID must belong to an organization that is actually a current sponsor for the specified program.
  - The ID of the current user must match the ID provided in the path param.
  - The creation will only be successful if the following fields are present:
    * valid user parent ID in path param
    * valid program OR organization ID
    * valid parent_org ID if experience is for program
    * start_date (datetime format)
    * title
  - The inclusion of end_date and current indication is encouraged if specified by the user.
  - If an end_date is provided, the two dates must be in chronological order.
  - Since they can only have one primary experience selected at a time, specifying current as true will cause their previous current experience (if one exists) to be set to false.
  - The newly created experience will be returned with the following associations:
    * Parent user
    * Connected organization or program
    
* **Example Request Payload:**
  ```javascript
    {
        "experience": {
            "program_id": 21,
            "start_date": "2012-02-23T05:46:19.904Z",
            "parent_org": 62,
            "title": "Robo Leader"
        }
    }
  ```

* **Example Success Response:**
  
  - **Status Code:** 201 
  - **Content:** <br />
  ```javascript
    {
        "experience": {
            "id": 219,
            "type": "Experience",
            "start_date": "2012-02-23T05:46:19.904Z",
            "end_date": null,
            "title": "Robo Leader",
            "award": null,
            "current": false,
            "link": "http://api.roadmaps.lvh.me:5000/v1/users/53/experiences/219",
            "parent_organization": 62,
            "user": {
                "id": 53,
                "type": "User",
                "first_name": "Evan",
                "last_name": "White",
                "description": null,
                "contact_url": "https://www.linkedin.com/in/evan-white-9bb674a2",
                "main_title": null,
                "main_location": null,
                "role": "user",
                "visible": true,
                "link": "http://api.roadmaps.lvh.me:5000/v1/users/53"
            },
            "program": {
                "id": 21,
                "type": "Program",
                "name": "Robotics Club",
                "description": "Freshly updated",
                "url": "freshupdate.example",
                "visible": true,
                "link": "http://api.roadmaps.lvh.me:5000/v1/programs/21",
                "parent_organization_names": [
                    [
                        "Intel",
                        "123",
                        "SE Street Rd"
                    ]
                ]
            }
        }
    }
  ```
  <br />
  
**19. Update a specific experience for a user parent based on the IDs provided in the path params and the valid contents of the request body**

* **URL:**
  
  - **PUT/PATCH** `api.roadmaps.mesa.org/v1/users/{user_id}/experiences/{id}`

* **Notes:**
  
  - The ID of the current user must match the user ID specified in the path param. 
  - The user ID path param and the experience ID path param must both be valid for existing entities.
  - Only start_date, end_date, title, award, and current fields can be updated.
  - Any provided dates must adhere to chronological ordering with either the other date in the request or the other date that already exists for the experience.
  - Since they can only have one primary experience selected at a time, specifying current as true will cause their previous current experience (if one exists) to be set to false.
  - When responding with the updated experience, the following associations are included in the payload:
    * Parent user
    * Connected organization or program
    
* **Example Request Payload:**
  ```javascript
    {
        "end_date": "2012-02-29T05:46:19.904Z",
        "award": "Best Robo"
    }
  ```

* **Example Success Response:**
  
  - **Status Code:** 200 
  - **Content:** <br />
  ```javascript
    {
        "experience": {
            "id": 219,
            "type": "Experience",
            "start_date": "2012-02-23T05:46:19.904Z",
            "end_date": "2012-02-29T05:46:19.904Z",
            "title": "Robo Leader",
            "award": "Best Robo",
            "current": false,
            "link": "http://api.roadmaps.lvh.me:5000/v1/users/53/experiences/219",
            "parent_organization": 62,
            "user": {
                "id": 53,
                "type": "User",
                "first_name": "Evan",
                "last_name": "White",
                "description": null,
                "contact_url": "https://www.linkedin.com/in/evan-white-9bb674a2",
                "main_title": null,
                "main_location": null,
                "role": "user",
                "visible": true,
                "link": "http://api.roadmaps.lvh.me:5000/v1/users/53"
            },
            "program": {
                "id": 21,
                "type": "Program",
                "name": "Robotics Club",
                "description": "Freshly updated",
                "url": "freshupdate.example",
                "visible": true,
                "link": "http://api.roadmaps.lvh.me:5000/v1/programs/21",
                "parent_organization_names": [
                    [
                        "Intel",
                        "123",
                        "SE Street Rd"
                    ]
                ]
            }
        }
    }
  ```
  <br />
  
**20. Delete a specific experience for a user parent based on the IDs provided in the path params**

* **URL:**
  
  - **DELETE** `api.roadmaps.mesa.org/v1/users/{user_id}/experiences/{id}`

* **Notes:**
  
  - The ID of the current user must match the user ID specified in the path param. 
  - The user ID path param and the experience ID path param must both be valid for existing entities.
  - A successful delete will respond with success code 200 and the resource that was just deleted.

* **Example Success Response:**
  
  - **Status Code:** 200 
  - **Content:** <br />
  ```javascript
    {
        "experience": {
            "id": 219,
            "type": "Experience",
            "start_date": "2012-02-23T05:46:19.904Z",
            "end_date": "2012-02-29T05:46:19.904Z",
            "title": "Robo Leader",
            "award": "Best Robo",
            "current": false,
            "link": "http://api.roadmaps.lvh.me:5000/v1/users/53/experiences/219",
            "parent_organization": 62
        }
    }
  ```
  <br />
  
**21. Execute a naive search based on a search term provided in the path param**

* **URL:**
  
  - **GET** `api.roadmaps.mesa.org/v1/search?term={string}`

* **Notes:**
  
  - The search can result in a collection of users, users and programs, programs and organizations, all three, and every other combination.
  - For each type of entity, the search result payload will include the following associations:
    * Media
    
* **Example Request:**

  - **GET** `api.roadmaps.mesa.org/v1/search?term=manager`
  
* **Example Success Response:**
  
  - **Status Code:** 200 
  - **Content:** <br />
  ```javascript
    {
        "results": [
            {
                "id": 15,
                "type": "User",
                "first_name": "Citlalli",
                "last_name": "Smitham",
                "description": "Ut mollitia ratione. Laborum provident quos beatae veritatis fuga. Soluta et ullam rerum voluptatum ut ut. Molestiae accusamus et totam. Necessitatibus perferendis nam.",
                "contact_url": "http://hirthe.co/antonia_kohler",
                "main_title": "Clinical Data Manager",
                "main_location": "The Misty Mountains Association",
                "role": "user",
                "visible": true,
                "link": "http://api.roadmaps.lvh.me:5000/v1/users/15",
                "media": [
                    {
                        "id": 29,
                        "type": "Medium",
                        "category": "image",
                        "description": "Repudiandae earum dicta nulla.",
                        "url": "http://lorempixel.com/100/100/people",
                        "link": "http://api.roadmaps.lvh.me:5000/v1/users/15/media/29"
                    },
                    {
                        "id": 30,
                        "type": "Medium",
                        "category": "video",
                        "description": "Eveniet non sit molestiae totam aut.",
                        "url": "https://www.youtube.com/watch?v=oa2_Nn0_h0Q",
                        "link": "http://api.roadmaps.lvh.me:5000/v1/users/15/media/30"
                    }
                ]
            },
            {
                "id": 11,
                "type": "User",
                "first_name": "Lyda",
                "last_name": "Flatley",
                "description": "Voluptatem officia qui aliquid consequuntur velit odit. Rerum beatae qui quidem. Facilis consequatur consectetur ex neque iste rerum necessitatibus. Officiis perspiciatis reprehenderit qui porro eius. Praesentium et aliquam omnis ut vero aut.",
                "contact_url": "http://zulauf.io/estel.purdy",
                "main_title": "Engineering Manager",
                "main_location": "Alcoa",
                "role": "user",
                "visible": true,
                "link": "http://api.roadmaps.lvh.me:5000/v1/users/11",
                "media": [
                    {
                        "id": 21,
                        "type": "Medium",
                        "category": "image",
                        "description": "Aliquid perspiciatis voluptatibus nihil.",
                        "url": "http://lorempixel.com/100/100/people",
                        "link": "http://api.roadmaps.lvh.me:5000/v1/users/11/media/21"
                    },
                    {
                        "id": 22,
                        "type": "Medium",
                        "category": "video",
                        "description": "Voluptatem recusandae voluptatem expedita.",
                        "url": "https://www.youtube.com/watch?v=oa2_Nn0_h0Q",
                        "link": "http://api.roadmaps.lvh.me:5000/v1/users/11/media/22"
                    }
                ]
            }
        ]
    }
  ```
  <br />
  
**22. [admin and super_admin only] GET all assigned user admins for a specific organization based on the ID provided in the path params**

* **URL:**
  
  - **GET** `api.roadmaps.mesa.org/v1/organizations/{id}/admins`

* **Notes:**
  
  - On the admin page, an admin or super_admin should be able to see a list of all admins assigned permission to edit a specific organization so that they can choose who to demote.
  - Regular admins will only be able to see lists of admins for organizations for which they have already been granted permission.
  - The payload will include base organization attributes and a list of all associated admin users.
    
* **Example Success Response:**
  
  - **Status Code:** 200 
  - **Content:** <br />
  ```javascript
    {
        "organization": {
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
            "link": "http://api.roadmaps.lvh.me:5000/v1/organizations/1",
            "admins": [
                {
                    "id": 2,
                    "type": "User",
                    "first_name": "admin",
                    "last_name": "admin",
                    "description": "test administrator",
                    "contact_url": "asdf.com",
                    "main_title": "Marine Engineer",
                    "main_location": "High Pass Association",
                    "role": "admin",
                    "visible": true,
                    "link": "http://api.roadmaps.lvh.me:5000/v1/users/2",
                    "email": "admin@example.com"
                }
            ]
        }
    }
  ```
  <br />
  
**23. [admin and super_admin only] GET all assigned user admins for a specific program based on the ID provided in the path params**

* **URL:**
  
  - **GET** `api.roadmaps.mesa.org/v1/programs/{id}/admins`

* **Notes:**
  
  - On the admin page, an admin or super_admin should be able to see a list of all admins assigned permission to edit a specific program so that they can choose who to demote.
  - Regular admins will only be able to see lists of admins for programs for which they have already been granted permission.
  - The payload will include base program attributes and a list of all associated admin users.
    
* **Example Success Response:**
  
  - **Status Code:** 200 
  - **Content:** <br />
  ```javascript
    {
        "program": {
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
            ],
            "admins": [
                {
                    "id": 2,
                    "type": "User",
                    "first_name": "admin",
                    "last_name": "admin",
                    "description": "test administrator",
                    "contact_url": "asdf.com",
                    "main_title": "Marine Engineer",
                    "main_location": "High Pass Association",
                    "role": "admin",
                    "visible": true,
                    "link": "http://api.roadmaps.lvh.me:5000/v1/users/2",
                    "email": "admin@example.com"
                }
            ]
        }
    }
  ```
  <br />
  
**24. Get the currently authenticated user**

* **URL:**
  
  - **GET** `api.roadmaps.mesa.org/v1/users/current`

* **Notes:**
  
  - When responding with the currently authenticated user, the following associations are included in the payload:
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
  
**25. [admin and super_admin only] Remove a specific permission to edit an organization from a specified admins list of permissions based on the ID specified in the path param**

* **URL:**
  
  - **DELETE** `api.roadmaps.mesa.org/v1/organizations/{organization_id}/revoke`

* **Notes:**
  
  - A user_id matching an existing user must be specified in the request body.
  - If the current user is a super_admin, they can revoke the permission to edit any specified organization.
  - If the current user is a regular admin, they must be visible and they can only revoke permission to edit specified organizations for those that they already have permission to edit.
  - No one can revoke the permissions of super admins.
  - If the revoked permission is the last permission for the specified admin, their role will be set back to user from admin.
  - A successful removal will respond with success code 200 and the specified admin that was affected.
    
* **Example Request Payload:**
  ```javascript
    {
        "user_id": 2
    }
  ```

* **Example Success Response:**
  
  - **Status Code:** 200 
  - **Content:** <br />
  ```javascript
    {
        "user": {
            "id": 2,
            "type": "User",
            "first_name": "admin",
            "last_name": "admin",
            "description": "test administrator",
            "contact_url": "asdf.com",
            "main_title": "Marine Engineer",
            "main_location": "High Pass Association",
            "role": "admin",
            "visible": true,
            "link": "http://api.roadmaps.lvh.me:5000/v1/users/2"
        }
    }
  ```
  <br />
  
**26. [admin and super_admin only] Remove a specific permission to edit an program from a specified admins list of permissions based on the ID specified in the path param**

* **URL:**
  
  - **DELETE** `api.roadmaps.mesa.org/v1/programs/{program_id}/revoke`

* **Notes:**
  
  - A user_id matching an existing user must be specified in the request body.
  - If the current user is a super_admin, they can revoke the permission to edit any specified program.
  - If the current user is a regular admin, they must be visible and they can only revoke permission to edit specified programs for those that they already have permission to edit.
  - No one can revoke the permissions of super admins.
  - If the revoked permission is the last permission for the specified admin, their role will be set back to user from admin.
  - A successful removal will respond with success code 200 and the specified admin that was affected.
    
* **Example Request Payload:**
  ```javascript
    {
        "user_id": 2
    }
  ```

* **Example Success Response:**
  
  - **Status Code:** 200 
  - **Content:** <br />
  ```javascript
    {
        "user": {
            "id": 2,
            "type": "User",
            "first_name": "admin",
            "last_name": "admin",
            "description": "test administrator",
            "contact_url": "asdf.com",
            "main_title": "Marine Engineer",
            "main_location": "High Pass Association",
            "role": "admin",
            "visible": true,
            "link": "http://api.roadmaps.lvh.me:5000/v1/users/2"
        }
    }
  ```
