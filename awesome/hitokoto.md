---
title: 一言 hitokoto.cn
date: 2017-11-15
---

## 关于一言

近日发现了一个有趣的网站 [一言](hitokoto.cn). 并提供API. 所以, 当然是玩一玩啦.

## 调用

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>一言Hitokoto</title>
  <style>
    blockquote{
     border-left: .1em solid gray;
     padding-left: 15px;
   }
  </style>
  <link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>
  <script>hljs.initHighlightingOnLoad();</script>
</head>

<body>
  <blockquote id="whisper">
    <script>
      fetch('https://sslapi.hitokoto.cn/?encode=text')
      .then(x => x.text())
      .then(x => document.getElementById('whisper').innerHTML = x)
    </script>
  </blockquote>

  <pre>
    <code class="html">
      &lt;blockquote id="whisper"&gt;
        &lt;script&gt;
          fetch('https://sslapi.hitokoto.cn/?encode=text')
          .then(x => x.text())
          .then(x => document.getElementById('whisper').innerHTML = x)
        &lt;/script&gt;
      &lt;/blockquote&gt; &nbsp;
    </code>
  </pre>
</body>

</html>
```

