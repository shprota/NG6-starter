# Kiosk to website interface API
## Abstract
Kiosk application is written in AgularJS and is obtaining the data from Wordpress in JSON format.
On the Wordpress side the API provider is [JSON API plugin](https://wordpress.org/plugins/json-api/)

A dedicated service *dataService* is responsible for pulling and processing the data from the server.

The kiosk content structure is organized with sections, subsections and content items.
There are sections that contain either subsections or content items and never both.

## Constants

Kiosk application uses hardcoded wordpress category IDs for the known sections and subsections by language:

   
| Section      | Contains subsections | He  | En  | Ru  | Fr  |
| ------------ | -------------------- | --: | --: | --: | --: |
| News         |  False               |  45 |  61 |  65 |  66 |
| Hotels       |  False               |  17 |   8 |  18 |  13 |
| Holiday      |  True                | 196 | 197 | 198 | 199 |
| Enjoying     |  True                | 173 | 174 | 175 | 176 |
| Surroundings |  True                |  48 |  56 |  90 |  77 |


## Endpoints

Here are the example requests. *wpUrl* is the base URL for Wordpress server:
#### Get category list (all categories in WP):
```javascript
$http.get(this.wpUrl + "/?json=get_category_index&lang=" + lang)
```
    
##### Expected response format:
Only fields that are parsed are specified

    count: int // Count of categories
    categories: Array<category>
        category: {
            id: int,
            parent: int,    
            title: String
        }
        
    
##### Get max *count* of posts in specific category:
```javascript
$http.get(this.wpUrl + `/?cat=${cat}&json=1&lang=${lang}&count=${count}`)
```    

##### Expected response format:
Only fields that are parsed are specified

    count: int // Count of posts
    posts: Array<post>
        post: {
            id: int,
            title: String,
            content: String,
            thumbnail: String,
            custom_fields: {
                dfiFeatured: Array<String>, // [0] element - title image
                hide_in_kiosk: Bool,
                kiosk_content: String, // Supercedes content field if set 
                hwe_date: Date, // Post date
                location: Array<float>, // Coordinates [lat, lng]
            }
        }
   


     
