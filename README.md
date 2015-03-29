# jquery-vertaccord

jquery-vertaccord is a minimal implementation of a vertical accordion.  It was designed to be more easily customizable and to leave as much room as possible for the CSS to handle decoration.

## Usage

### Overview

An accordion is a group of two or more related items.  You'd expect, then, to build an accordion from a list - ordered or unordered - or from `section` elements within an `article`, for example.  For this reason, jquery-vertaccord requires that you *target the element containing items you'd like to appear in an accordion*.

There are two ways to use jquery-vertaccord:

- Select group elements and then call `vertaccord()` on the jQuery instance.  Pass configuration data directly, to the method.
- In the markup, identify group elements using the class-name `vertaccord`; then call `jQuery.vertaccord()`.  In this case, the plugin will look for JSON-encoded configuration data in the `data-vertaccord` attribute on the group element.

So, here's how you could turn an unordered list into a vertical accordion by using the jQuery instance method:

```html
<ul>
    <li>...</li>
    <li>...</li>
    <li>...</li>
</ul>
```

```javascript
jQuery('ul').vertaccord({
    closedHeight: 90
});
```

And the following example shows how to take a declarative-style approach by employing the static method:

```html
<article class="vertaccord" data-vertaccord='{"closedHeight": 180}'>
    <section>...</section>
    <section>...</section>
    <section>...</section>
</article>
```

```javascript
jQuery.vertaccord();
```

You can find more, working examples in `tests/`.

### Config

| Name                | Data type | Required? | Default value | Description                                                                         |
| :------------------ | :-------- | :-------- | :------------ | :---------------------------------------------------------------------------------- |
| `closedHeight`      | integer   | yes       | `undefined`   | The height, in pixels, of each closed child element.                                |
| `animationDuration` | integer   | no        | `400`         | The duration, in milliseconds, of the open, and close, animations.                  |
| `beforeOpen`        | function  | no        | `undefined`   | A function to call immediately before a hovered child element is opened.            |
| `afterOpen`         | function  | no        | `undefined`   | A function to call immediately before a previously hovered child element is closed. |

### CSS

| Class name          | Description                      |
| :------------------ | :------------------------------- |
| `vertaccord`        | Given to the group element.      |
| `vertaccord-open`   | Given to the open child element. |
| `vertaccord-closed` | Given to closed child elements.  |

## Installation

Install using Bower, thus:

```sh
bower install jquery-vertaccord
```

---

The Spongebob Squarepants images appearing in the examples under `tests/` are provided by [Encyclopedia Spongebobia](http://spongebob.wikia.com/wiki/Encyclopedia_SpongeBobia).