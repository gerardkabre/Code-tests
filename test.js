/*
 1) Describe the process, in a react/redux project, to fetch a set of data from a remote API endpoint, then to store that data into redux and then to present it on the screen.
 */

const response = `
- Using some middleware library like redux-thunk or redux-saga in order to be able to do async logic in redux, 
Using redux-thunk for example first step would be a react component calls a thunk action "getData", that thunk has access to 
the state and can dispatch other actions, for example we first dispatch a LOADING action which the appropiate reducer will take 
and use it to modify the current state that reducer handles  and change a property to loading: true. The react component reading 
this information (either by using useSelect hook or with mapSateToProps with the connect function from react-redux) will update 
with that new prop, meanwhile in that thunk function, it makes an async call to get the data that once finished dispatches an other 
action either successful or expressing failure that will again be used in the according reducer to update the state and be used in 
the react componnent that is using that value.
`;

/*
2) Create a function `generateUrl` to generate a URL from given parameters:
*/

function generateUrl({ url = "http://testurl.bitfinx.com", ...params }) {
  const query = serialize(params);

  return `${url}/${query}`;
}

function serialize(params) {
  return Object.entries(params).reduce((acc, [key, value]) => {
    if (!value) return acc;

    return `${acc}&${key}=${value}`;
  }, "");
}

describe("generateUrl", () => {
  test("Returns formatted query string only with paramerters that contain a value", () => {
    expect(
      generateUrl({
        width: 360,
        height: 300,
        locale: "en",
        toolbar_bg: "",
        interval: "3h",
        pair: "BTC_USD",
      })
    ).toEqual(
      "http://testurl.bitfinx.com/&width=360&height=300&locale=en&interval=3h&pair=BTC_USD"
    );
  });
});

/*
3) Apply some refactoring to improve the code of the following function. Explain the reasons behind your changes and which benefit they bring into the code.
*/

// Function to refactor:
var volumeSetup = function () {
  // setup volume unit interface
  var volumeUnit = window.APP.util.getSettings("ticker_vol_unit").toUpperCase();
  var element = null;
  if (volumeUnit === "FIRSTCCY") {
    element = $("#tickervolccy_0");
  } else if (volumeUnit === "USD") {
    element = $("#tickervolccy_USD");
  } else if (volumeUnit === "BTC") {
    element = $("#tickervolccy_BTC");
  } else if (volumeUnit === "ETH") {
    element = $("#tickervolccy_ETH");
  }
  if (element) {
    element.prop("checked", true);
  }
  // override currencies list
  var result = window.APP.util.nitCurrenciesList();
  return result;
};

/*
 * REFACTOR AND EXPLANATION:
 *
 * One single function was doing a lot of different actions which is harder to read test and debug
 * so the first thing is moving each individual action to its own function, which at the same time allows
 * to delete the comments because now the code itself can be more explanatory with the function names.
 *
 * VolumeSetup now only connects all the individual actions between them.
 *
 * To get the volume unit, its sepearted into its own function but in a  generic way that can get any
 * setting from the APP settings rather than a getVolumeUnit function. This way can be resued for the other settings.
 *
 * it uses ? to avoid breaking the app if there was no APP in the window and checks that the setting exist before calling
 * toUppercase to also avoid breaking the app, there is defensive in all the functions, depending on how this had to
 * be handled eg: stop all the process on 1 failure, the defensive coding in the little actions could be removed and then
 * in volumeSetup() use an error handler try{}catch(){} that would stop and do X actions once one of the actions has thrown
 * an error.
 *
 * To get the element instead of declaring a variable and then checking with a conditional each value,
 * it reads it from an object. Clearer to read easier to modify.
 *
 * To change the prop, moved to a separate function that can be reused to change any kind of prop.
 *
 * To override the currencies list, moved to a function with a clearer name that allows to remove the comment and in case
 * that action had to be done differently only that function would have to be modified.
 *
 */

function volumeSetup() {
  const volumeUnit = getSetting("ticker_vol_unit");
  const element = getElement(volumeUnit);

  changeProp({ element, prop: "checked", value: true });

  return overrideCurrenciesList();
}

function getSetting(setting) {
  const setting = window?.APP?.util.getSettings(setting);

  if (setting) return setting.toUpperCase();
  return "";
}

function getElement(unit) {
  const elementsPerUnit = {
    FIRSTCCY: "#tickervolccy_0",
    USD: "#tickervolccy_USD",
    BTC: "#tickervolccy_BTC",
    ETH: "#tickervolccy_ETH",
  };

  return elementsPerUnit[unit];
}

function changeProp({ element, prop, value }) {
  if (!element || !element.prop) return;

  element.prop(prop, value);
}

function overrideCurrenciesList() {
  return window?.APP?.util.initCurrenciesList();
}
