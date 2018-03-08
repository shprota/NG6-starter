# Kiosk to website interface API
## Abstract
Kiosk application is written in AgularJS and is obtaining the data from Wordpress in JSON format.
On the Wordpress side the API provider is [JSON API plugin](https://wordpress.org/plugins/json-api/)

A dedicated service *dataService* is responsible for pulling and processing the data from the server.

The kiosk content structure is organized with sections, subsections and content items.
There are sections that contain either subsections or content items and never both.

## Constants

Kiosk application uses hardcoded wordpress category IDs for the known sections and subsections by language:

   
| Section | Contains subsections | He | En | Ru | Fr |
| ------- | -------------------- | -- | -- | -- | -- |
| News    |  False               | 45 | 61 | 65 | 66 |
