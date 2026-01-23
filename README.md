# werxaam-site

A nodejs .pug static site generator for werxaam.nl

## Configuration

### Pricing

The prices for "hout kuub" and stacking are centrally defined in `source/werxaam.json` under the `pricing` section:

```json
"pricing": {
  "houtKuubPrice": 165,
  "houtStapelenPrice": 20
}
```

To update the prices, simply edit these values in `source/werxaam.json` and rebuild the site with `npm run build`.
