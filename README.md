# SpravceTymuKlubu

Aplikace SpravceTymuKlubu slouží pro správu členů, týmů a soupisek daného sportovního klubu. Konkrétně možňuje vytvářet, upravovat, prohlížet a mazat informace o členech, týmech a soupiskách.

## Funkce

- Vyhledávání v databázi členů dle křestního jména či příjmení
- Zobrazení seznamu členů, včetně filtrace na základě vyhledávání
- Přidání nového člena
- Úprava údajů člena, včetně přiřazení týmu a přidání na soupisku
- Smazání člena
- Zobrazení týmů, včetně přiřazených členů
- Přidání týmu
- Úprava názvu týmu
- Smazání týmu
- Zobrazení soupisek, včetně přiřazených členů, jejich rolí a pozic

## Instalace a spuštění projektu

Naklonujte repozitář a nainstalujte závislosti:

- `git clone git@github.com:OndraSvec/spravceTymuKlubu.git`
- `npm i`

Spusťte server pro vývojové prostředí a server pro simulaci databáze:

- `ng serve`
- `npm run json:server`

Aplikaci najdete na adrese [http://localhost:4200/](http://localhost:4200/)
