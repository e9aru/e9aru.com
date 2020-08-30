(() => {
  "use strict";

  const $dynamicRaw = document.getElementById("dynamicRaw");
  const $dynamic = document.getElementById("dynamic");
  let lc;

  function draw(el, tx, i, de, cb) {
    if (i >= tx.length) return cb(el);

    // el.style.opacity = "1";

    if (Date.now() - lc > de) {
      // el.style.opacity = ".99";
      el.innerHTML += tx[i] === "|" ? "<br />" : tx[i];
      i++;
      lc = Date.now();
    }

    console.log(el.innerHTML);

    requestAnimationFrame(() => {
      draw(el, tx, i, de, cb);
    });
  }

  function finish(el) {
    let dmTxt = "DM me on Twitter";
    el.innerHTML = el.innerHTML.replace(
      dmTxt,
      '<a href="https://twitter.com/e9aru" target="_blank">' + dmTxt + "</a>"
    );
    el.innerHTML = el.innerHTML.replace(
      "Heroicode",
      '<a href="http://heroicode.com" target="_blank">Heroicode</a>'
    );

    setTimeout(() => {
      document.body.className += "finished";
    });
  }

  if ($dynamic) {
    const text = "" + $dynamicRaw.textContent.replace(/ +(?= )/g, "").trim();
    const delay = 8;
    lc = Date.now();

    $dynamic.innerHTML = "";
    draw($dynamic, text, 0, delay, finish);
  }
})();
((i, s, o, g, r, a, m) => {
  i["GoogleAnalyticsObject"] = r;
  (i[r] =
    i[r] ||
    function () {
      (i[r].q = i[r].q || []).push(arguments);
    }),
    (i[r].l = 1 * new Date());
  (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m);
})(
  window,
  document,
  "script",
  "https://www.google-analytics.com/analytics.js",
  "ga"
);

ga("create", "UA-35010569-10", "auto");
ga("send", "pageview");
