CHICHI Public Site
==================



This is the development environment and repository for the website of CHICHI - the bicycle store in 
the heart of Berlin Neukölln. The site can be found under [chichi.berlin](http://chichi.berlin)




### How to get started?

__Prerequisites:__ 

*   Node/NPM
*   Go
*   Hugo


#### Installation

```sh
$   npm install
```


#### Development

```sh
$   ???
```


#### Build and Deploy

```sh
$   npm build
```



### Website structure

```
  /                                     [page: root]            -   overview of all website parts,
  |                                                                 newest posts etc.
  |
  +-- Fahrräder                         [page: item-list]       -   curated list of bikes 
  |   +-- Gruppe/Kategorie              [page: item-list]       
  |   |   +-- Model Name B              [page: deailed-item]    -   infos, images, specs, link to post 
  |   |   +-- ...
  |   +-- Fahrrad-Konfiurator(en)       [embedded/external]
  |   +-- ...
  +-- Komponenten                       [page: item-list]       -   curated list of parts
  |   +-- Kategorie                     [page: item-list]
  |   |   +-- Gruppe                    [page: item-overview]   -   selection of specific items and
  |   |   +-- ...                                                   and related manufacturers
  |   +-- ...                           
  +-- Ausrüstung                        [page: item-list]       -   curated list of accessories
  |   +-- Kategorie                     [page: item-list]
  |   |   +-- Gruppe                    [page: item-overview]
  |   |   +-- ...                           
  |   +-- ...                           
  +-- Service                           [page: services]        -   shows offered services in sections 
  +-- Hersteller                        [page: partner-list]    -   manufacturers grupped in sections
  +-- Firmenphilosophie                 [page: company-values]  -   sections showing different values
  |                                     
  +-- Blog                              [page: post-list]
      +-- Fancy Category Name           [page: post-list]
      +-- My new Blog Post              [page: post]
      +-- Another awesome Post          [page: post]
      +-- ...                           
  |                                     
  +-- Kontakt & Impressum               [page: text]
  |                                     
  +-- 404                               [page: 404]

```

#### Concepts and Notes

+   bike configurator: https://hartje-konfigurator.de/
+   supported Langs: german
    -   use i18n framework to separate content from templating
+   depending on the amount of existing partners, they might get moved into the footer until they 
    are enough
+   root/landing page:
    -   banner with some news (e.g. opening hours, temp. sell); just one instance
+   for bikes, parts, accessories:
    -   pages in between start and end should have the same design
    -   in-between levels for grouping are based on certain specs
+   company values: 
    -   sorted in sections
    -   should contain topics like supported insurance
    -   links in footer, not part in header nav
+   item-list:
    -   optional: description text on hover either on top of the tile image or next to
+   blog:
    -   side nav in list and detailed view
    -   side nav contains blog categories
    -   one post can have multiple groups
+   side nav (incl. breadcrumps): https://tympanus.net/Blueprints/MultiLevelMenu/
+   header, sections example: https://tympanus.net/Blueprints/AnimatedHeader

+   banner in dunkelgrau
+   header nav in type writer
+   absolute header hight in pixel
+   nav active: larger font and bold, tabs mit dem hellen grau probieren
+   helles grau als bg
+   banner im dunklen grau mit weisser font und weissen horicontal lines
+   footer auch pink
+   landing page: banner, key visual, 3 ros newest articles, sonderangebote im wechsel links image rechts text or vise versa
+   using synced slider (https://kenwheeler.github.io/slick/) to present images in `rubric/single.html`
    
    
#### Design

##### Fonts

+   American Typewriter Condensed
+   Open Sans

##### Colors

+   Pink:   0/100/0/0   255,0,255   old: rgb( 255,   0, 153 )
+   Gruen:  50/0/100/0  128,255,0   old: rgb( 153, 204,  51 )


#### Developer Notice

+ section url overwrite:
    - https://discourse.gohugo.io/t/override-section-url/6197
    - https://discourse.gohugo.io/t/how-to-translate-sections/9060
    - https://discourse.gohugo.io/t/content-organization-not-working-in-multilingual-site/4967
    - https://github.com/gohugoio/hugo/issues/3354
+ embedding a map:
    - https://leaflet-extras.github.io/leaflet-providers/preview/
    - https://www.opencyclemap.org/
    - https://wiki.openstreetmap.org/wiki/Bicycle

#### Appendix

*   project boilerplate is partially inspired by https://github.com/fspoettel/blaupause
*   wertgarantie fee calculator: https://wwwapi.serviceeu.com/rt/31d68559-31cf-4794-8ddd-1f93d6bd635c.html

