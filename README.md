### Reference exchange rate BCV

```bash
npm i reference-exchange-rate-bcv
```

### How to use

```javascript
const { getDollar } = require('reference-exchange-rate-bcv');

getDollar()
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
```
