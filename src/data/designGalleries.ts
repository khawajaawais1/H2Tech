export type DesignPage = {
  src: string;
  title: string;
  width: number;
  height: number;
  blurDataURL: string;
};

export type DesignSite = {
  title: string;
  pages: DesignPage[];
};

export const designGalleries: Record<string, DesignSite[]> = {
  websites_tier1: [
    {
      title: "Starter site 1",
      pages: [
        { src: "/samples/websites-tier1/site1/1.webp", title: "Starter site 1", width: 1600, height: 12722, blurDataURL: "data:image/webp;base64,UklGRtoBAABXRUJQVlA4WAoAAAAQAAAADwAAfgAAQUxQSHAAAAABcBVJkmL5V/ZQAjM6uOnuBwOP6SsiJqC1X66Si0N/KCoJzQYCk6bpUFQIQrObSNBspIa5oaxEvSYyQskc1+HNcCUyoqPa5ZOhoSCwIt2GJO0ml/g2mNMwokMlPyRQokOLfI9K4uVYCX9FLBkrl08JVlA4IEQBAABwCACdASoQAH8APuVeqk2pJSQiM/maqSAciWkAzUpsCVAENz+Xrb7CdN75J7hC6me9M9EI9AEBhTXzecsWG0j+XYHH95X/xgbJ4ygwAP7xErW3lk4cauF0/7DxNX3zxOosmKjogTU8GnCzdg1Fd0nZTvUjquSTiRB8pPR9TkT1De/iluf0xdoONPfvb/NOlTINr7xXvKfd83TAxnX3p3ZXukWmQgrSU+lSvV0bwKiPbd4p/411/wh5J9DQaGq9Ll+r/DaJlq4XaqBFAp3OU5F0MPUqWisNCCrjY3S0SWuwzuhYxFOmYn8TkbGsRcrg/0cvnVweSfWkX/Es+Fvq/Of+nrGw+ceYATwGQ9G/TzF3GANvpw/0cZeEeqQRV7c2i1b7BX5SX9jOXJ9QCyzl5hh8GFvpsJ1P/dK8DH8vKoZ/baIAAAA=" },
      ],
    },
    {
      title: "Starter site 2",
      pages: [
        { src: "/samples/websites-tier1/site2/1.webp", title: "Starter site 2", width: 1600, height: 9190, blurDataURL: "data:image/webp;base64,UklGRpoBAABXRUJQVlA4WAoAAAAQAAAADwAAWwAAQUxQSCoAAAABL6AQQADE37nRiIh4ehiGbGURPkIIIYSQP1LHThH9DyBzvkAaUEDmHwFWUDggSgEAAPAHAJ0BKhAAXAA+7WSqTymlI6IwFVqpMB2JZQDO863mEEefrYVnvD0mj4gkOA2DujHyPdRmDrFIiorrxU/yQjkcWDEkM9gDAAD+88lY3CowAKL2KrETFy85YB5CKCX5dNNwOrnJ1ggtWBd5B+0xpUW5tegzBqpW29Xt2DN3O+Z2prKoD/aDXLxQoWCf9fITY3XvCZvfYrAURe44j0GeoW9V6F7WMEAiUJryhb2kBFgMMZVtqCWtQgRu+b2hoSlpXPHSB0d7AurCenP96vMh0Ycm7OfsnwGJ3pxjpmMHzSod086Q5PH89DPzIkrLP0xoOmR5RQ8OOfDzJXtjmm3Rk7mk3wPIJXFlhT122SRZT+nNPxoRBG2H83LyuTTkhI3HB6930Aqv50HA/0PP2dF2mhiqZrthtM2milbc2A5VC+FlHdj8ait7ejgAAA==" },
      ],
    },
  ],
  websites_tier2: [
    {
      title: "Business Site 1",
      pages: [
        { src: "/samples/websites-tier2/site1/1.webp", title: "Home page", width: 1440, height: 3532, blurDataURL: "data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAADwAgCdASoQACcAPu1orFCppaQiqqgBMB2JZQDImB3QQAD+77iolMsZen6q4dk+q6/ytqrjq8iWJ3QGVDA6ZCQwLYiCLAAA" },
        { src: "/samples/websites-tier2/site1/2.webp", title: "Sample page 1", width: 1460, height: 2571, blurDataURL: "data:image/webp;base64,UklGRq4AAABXRUJQVlA4WAoAAAAQAAAADwAAGwAAQUxQSCQAAAABH0CQbePPMNXt14iIuBwK2rZhgqHlD7e7BCL6HwZ2Atwq/AJWUDggZAAAANADAJ0BKhAAHAA+7WKpTamlo6IwCAEwHYljALDsaaPpAE4dyJGQAAD+/DrOBmfHo0nquWtEV1cCnlHbHtRi3WDF8s5v5Dj1FFHFoWf2YFjjfTF+s8Wbfu8yMbt9rfZPF0wcAAA=" },
        { src: "/samples/websites-tier2/site1/3.webp", title: "Sample page 2", width: 1361, height: 1852, blurDataURL: "data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAAAQAwCdASoQABYAPu1iqU2ppaOiMAgBMB2JY2llUI8TmgAA/u/1f40klcruzbn2pQY9hWgD7OEHVaAA" },
      ],
    },
    {
      title: "Business Site 2",
      pages: [
        { src: "/samples/websites-tier2/site2/1.webp", title: "Page 1", width: 1452, height: 3192, blurDataURL: "data:image/webp;base64,UklGRsIAAABXRUJQVlA4WAoAAAAQAAAADwAAIgAAQUxQSDcAAAABX6CobSSHP9gt73JnGhEReHqNF1Ab24ZF9slohW7kdKD/mX35phH9n4DeeU+YoIZDYYL/ZZUQAFZQOCBkAAAA8AMAnQEqEAAjAD7dWqRNqKUjojVIARAbiWMAxNgtM+MCmfp8ZE2vUAD+8zW4RdGSIt8Gp984vo4ljlWp9TqGCrFgRoIbqyglDIr6jC8J5OHWEgHHdRlUiXHTB53ZyzM07IxAAA==" },
        { src: "/samples/websites-tier2/site2/2.webp", title: "Page 2", width: 1452, height: 3005, blurDataURL: "data:image/webp;base64,UklGRq4AAABXRUJQVlA4WAoAAAAQAAAADwAAIAAAQUxQSDIAAAABR6CgbRuGP9OqFHZMIyICHStQE8lqxZ8a1CCAOIh/M3l92oj+T8CcfW8wweyCwQT/CVZQOCBWAAAAEAQAnQEqEAAhAD7lYqZNqSWjojVYCAEgHIllAMfkFiG9R5CsTUP1ZwAA/vMl0c0MQ+yAJE9ARA8GeBYNb1smlePwGNWZ893Dr/37JTZA8XHEOibaQAA=" },
        { src: "/samples/websites-tier2/site2/3.webp", title: "Page 3", width: 1457, height: 3084, blurDataURL: "data:image/webp;base64,UklGRqwAAABXRUJQVlA4WAoAAAAQAAAADwAAIQAAQUxQSDcAAAAFYBNJsqrH4IL8S3hGyAj8v9Hf/GcRMQGtbCm+39hTAaUm6kvpIQsoNcXvgvpQpssCSs2VNxUHAFZQOCBOAAAAkAMAnQEqEAAiAD7tXKhNqaSjojVYCAEwHYllAMzQH7Qszc8VAAD+8Ie57c5sKdozY55SqFeCwX5WpDoBvjQBLoLS9FBnj1Ll1ugQAAAA" },
      ],
    },
  ],
  websites_tier3: [
    {
      title: "Advanced Sites",
      pages: [
        { src: "/samples/websites-tier3/site1/1.webp", title: "Home page", width: 1600, height: 3691, blurDataURL: "data:image/webp;base64,UklGRtAAAABXRUJQVlA4WAoAAAAQAAAADwAAJAAAQUxQSBYAAAABD9D/iAgoZBsBGsD5K78CEf1PjHgCVlA4IJQAAABQBACdASoQACUAPt1apE2opSOiNUgBEBuJQBOmZDCME4LBT3wA9wxV/a6AAP7wP1nGeCYZWh+UiWAZS0ayWCP4kQVGvePjj0/RYfRrFm0/SYlmvqIx3NVIsdhkG233KlOmDvKKymtr44DUXkiUvC0d8mY0fzIs2IosLEoutTBQr8/4y5ICsChWZqx36+aVyC9Z4+gA" },
        { src: "/samples/websites-tier3/site1/2.webp", title: "Sample page 1", width: 1600, height: 2046, blurDataURL: "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAABQAwCdASoQABQAPu1iqU2ppaOiMAgBMB2JZQAAXKc7iFw0AAD+8dwfNVSxTC7mJ7Cv+2X3Y2dsaTtgzbz6asKFB2/Zeyl9+xUcvwHSdafQqAqdkt9/cAAA" },
        { src: "/samples/websites-tier3/site1/3.webp", title: "Sample page 2", width: 1600, height: 2168, blurDataURL: "data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAADQAwCdASoQABYAPu1iqU2ppaQiMAgBMB2JZQDCgCKUJFgeaFraDjAA/vHQyhHVvHrX4WrTU/C6mtdXFspEZTgJy8ewtBWsYUqO34cH/1HvKjgj0LQL2ZrVfRElzSAAAAA=" },
        { src: "/samples/websites-tier3/site1/4.webp", title: "Sample page 3", width: 1600, height: 3990, blurDataURL: "data:image/webp;base64,UklGRrYBAABXRUJQVlA4WAoAAAAQAAAADwAAJwAAQUxQSKYAAAABgFpt2/LmDehkCxogipkzQDTzGOSZQTKTo7ZzMKPj9il/tjIiJgD/zu/MYL66uDjZPz48ODg8Pjg4PL8SSF1Ok0xtMqllZoNNJCQ/HrC6Aq5WeIKfKIhnbC6ByzUeEPxpewPcbPH8zba33I0ni8VUrJKuyoncuEeTuPR7EI9oEZ/3I5cohCe0icf9lRSNTNNDHPp1Pmy1W73ZH8H8xAzmN2YwHzADVlA4IOoAAAAQBQCdASoQACgAPt1Yo02opSMiNUgBEBuJQBfnO4FwWSbbrugUjhZBzNdxHMwKvsIQAP7zflleCc5M78m7zfai9ByVGvWjGFyi2pSlo88Q/PYN/lzsP4R5c/Vnob8lx9EtFiB3oex5b2dCPRFbX5a6I7+Wdjw66V3VArtwrF8ajwgoePBcL4KHU3NXJcrITnjL4S3R9bjXK+Pxhq+vaiPufTl/0j8b3YV3nJiQyu+HPC6bsFFHC7hbUcVIIx60McMO03EXC+evOu8nwHYTex8TRKl3aPGwZVyKtxAPm+fP7gqEJhTqlaoAAAA=" },
        { src: "/samples/websites-tier3/site1/5.webp", title: "Sample page 4", width: 1600, height: 3436, blurDataURL: "data:image/webp;base64,UklGRqoAAABXRUJQVlA4WAoAAAAQAAAADwAAIQAAQUxQSB4AAAABF6AgbQPGv+V2x0ZExA+EBISTTvqqR/Q/WasCVAFWUDggZgAAAJAEAJ0BKhAAIgA+7VyoTamko6I1WAgBMB2JZwDBzBZz5PhHZW/9NsSzWO1sAAD+8dkhwLE9VndXTwR1hwtsFB1+SbiSAMF2xsV+tIVhV3SUvZv8/A+nwwQEuUEu/s1rIj2UbjjoAA==" },
      ],
    },
  ],
  websites_tier4: [
    {
      title: "Premium & E-commerce",
      pages: [
        { src: "/samples/websites-tier4/site1/1.webp", title: "Home page", width: 1600, height: 6114, blurDataURL: "data:image/webp;base64,UklGRmgBAABXRUJQVlA4WAoAAAAQAAAADwAAPAAAQUxQSD0AAAABZ2CQbSR/2RO4+69GRAREqQxKA4CQiDQmsIJ9ZKp0+Ya6Cb8BrkX0n2CSptqOicrtWISwtWaVrc/3vpEGAFZQOCAEAQAAMAYAnQEqEAA9AD7tZqtNqaWkIjAIATAdiWMAzggStfzDXhbtwFTSlnWY9eyMLTWuHPhalVWcUyOfAAD+6xPL7xsWeuUMY6iTdAigpNgXG7EiC+Z9XiSolZB3TLqCu1KRHUHJOYxSy+4Q1f5S6XJ9lLAPFqFCBYKABr3J0o8ppM1JWNW7kjcXeDBpWc12a+ys31D/fHcg1Les9br+tpx5yXfOdDUx/jt//v/j/bwwtt3VkzrHOPbK/lDVSVMUnoS1U7TGaFt498OjAxBwXf16y9+OZv70H+mP4J2/Qd90h3LduG8MSukIi2lKCsM4oRz/I9tDm3144Ye+sDq7H5L0+Sgx4AA=" },
        { src: "/samples/websites-tier4/site1/2.webp", title: "Sample page 1", width: 1600, height: 3728, blurDataURL: "data:image/webp;base64,UklGRg4BAABXRUJQVlA4WAoAAAAQAAAADwAAJAAAQUxQSDgAAAABYCLbdpr9Ly0oozgpg2R6ruTqIoJAgKKwwArSl9WFZS8NTlx4IGkc54U74v38T77/ndrH6cLh0FZQOCCwAAAAUAQAnQEqEAAlAD7taqxQqaWkIqqoATAdiWQAzNBc553RhDLFsGtQI9mPgAD++75kll56Tcn0AFmS/u08EXGqDD2ojpApKBPovwfRP7h/Kfm9FsrJaQSsjgLYFbuqSB2htOn+836vyjbajyqQ5nR12RI7aBdrTrrfgNJ/S2KgRd6YDrBMtkmulEy2NjU9MPlAwZgvx2WBP98CD+7X0870Zne9opU+irwekhzI0hjDgAA=" },
        { src: "/samples/websites-tier4/site1/3.webp", title: "Sample page 2", width: 1600, height: 2980, blurDataURL: "data:image/webp;base64,UklGRh4BAABXRUJQVlA4WAoAAAAQAAAADwAAHQAAQUxQSDYAAAAFUBvbNmSnjk//DSjG08Ye+T8VRgTBJI2DLtgVlYZW704C0WWZfvNhWWgx6rudslmuGTGQfgRWUDggwgAAAFAEAJ0BKhAAHgA+7WKqTamlpCIwCAEwHYlkAL87LAGLs7rzqlXL7eNEoAAA/vHgwl+ZgPuE5Bb3uYXorcbynXhO4roboiH1Obbo8ZqxPag/BRzQjDCGucpEjaPW4ZMPWF09Y3wbXx/mr/Gzgg9F/P+euLbIwYRAk7Pz006b858unZuftSDCHvC7gbOszE4uPtton38MfvnJL0/pPRC6q23scrByQubd5wXkIau/4lALJer1454r7yPGKhVYzr9zroYA" },
        { src: "/samples/websites-tier4/site1/4.webp", title: "Sample page 3", width: 1600, height: 5170, blurDataURL: "data:image/webp;base64,UklGRuQAAABXRUJQVlA4WAoAAAAQAAAADwAAMwAAQUxQSDkAAAAFYBoAQBqcN/z/zDd6ANmTbItLEaEgbQOmOw5qwokGwZ7FslHrxER56XkEJ3g98P/yuWfF1qOn3AMAVlA4IIQAAABQBACdASoQADQAPu1kqE2ppaQiMBgMATAdiWMAAI+A92fvz511EAl0f2wAAP71GiIvca3SUed03q+PgYQKsfhFCF/oA/VgcP1GYXTr3QrZgxuAh0QJyq07T8Y0iP6R31YLh9J/1368PxuyexC727bGTNmOoKvn58ngZ/tHBhGJ0igAAAA=" },
        { src: "/samples/websites-tier4/site1/5.webp", title: "AI chat bot", width: 1600, height: 2167, blurDataURL: "data:image/webp;base64,UklGRkQBAABXRUJQVlA4WAoAAAAQAAAADwAAFQAAQUxQSHYAAAANcFzbtpOc+z+ZBijBhuzHcnJBLgtw5HKU/TwyzBxHxATAqgpi2ETXM5Sn1E3wWj9IU8RkaS98UDMhokBkaAK5GmfMFA0Lteg/NFdrpPEmCF6eUUFA903l/Ejzu8Wi3l4yCbDmq4jGYvuEBnA+8R9oQm0NQwkAVlA4IKgAAABwBACdASoQABYAPu1iqk2ppaQiMAgBMB2JbAC1AaAlkkICYYrZfwtav560AAD+1hF9ohlX6vpkLLa9HRb7JGLskH1jh7SK6eUglFQVv5nA6Jf6xpqiFifFXaJTvinrTIylGyIbV+ztfyem0zyMrnwZzWsY5C2YO+NjDrAo0o9ZgO7bSnG0tjzPz4hOPD1o6RqRFbjNPEVfoUsbs0E7+t/72rVIEpS5AAA=" },
      ],
    },
  ],
};
