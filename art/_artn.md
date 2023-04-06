# Art Notes

```{type} optional title
Admonition text
```

```{note} optional title
Admonition text
```

```{warning} optional title
Admonition text
```

```{tip} optional title
Admonition text
```

```{example} optional title
Admonition text
```

```{exersice} optional title
Admonition text
```

```{discussion} optional title
Admonition text
```

```{type} optional title
Admonition text
```

`````{admonition} This admonition was styled...
:class: caution
With a tip class!
`````

`````{admonition} This admonition was styled...
:class: hint
With a tip class!
`````

`````{admonition} This admonition was styled...
:class: example
With a tip class!
`````

"note"
"warning"
"tip"
"caution"
"important"
"hint"
"question"
"exercise"
"discussion"
"example"

```{grid-item-card}
:shadow: med

![alt text](./img/mologo/mo2)
```

```{grid-item-card}
:shadow: lg

![alt text](./img/mologo/mo2)
```

```{grid-item-card}
:shadow: none

`sd-shadow-none`
```

```{grid-item-card}
:shadow: sm

`sd-shadow-sm`
```

```{grid-item-card}
:shadow: md

`sd-shadow-md`
```

```{grid-item-card}
:shadow: lg

`sd-shadow-lg`
```

````

````{grid} 1 2 3 4
:gutter: 4

```{grid-item-card}
:shadow: none

`sd-shadow-none`
```
```{grid-item-card}
:shadow: sm

`sd-shadow-sm`
```
```{grid-item-card}
:shadow: md

`sd-shadow-md`
```
```{grid-item-card}
:shadow: lg

`sd-shadow-lg`
```
````

````{grid} 1 2 3 4
:gutter: 5

```{grid-item-card}
:shadow: none

`sd-shadow-none`
```
```{grid-item-card}
:shadow: sm

`sd-shadow-sm`
```
```{grid-item-card}
:shadow: md

`sd-shadow-md`
```
```{grid-item-card}
:shadow: lg

`sd-shadow-lg`
```
````

````{grid} 4 3 2 1
:gutter: 2

```{grid-item-card}
:shadow: none

`sd-shadow-none`
```
```{grid-item-card}
:shadow: sm

`sd-shadow-sm`
```
```{grid-item-card}
:shadow: md

`sd-shadow-md`
```
```{grid-item-card}
:shadow: lg

`sd-shadow-lg`
```
````

````{grid} 1 1 2 2
:gutter: 4

```{grid-item-card}
:shadow: none

`sd-shadow-none`
```
```{grid-item-card}
:shadow: sm

`sd-shadow-sm`
```
```{grid-item-card}
:shadow: md

`sd-shadow-md`
```
```{grid-item-card}
:shadow: lg

`sd-shadow-lg`
```
````

````{grid} 3 3 3 3
:gutter: 4

```{grid-item-card}
:shadow: none

`sd-shadow-none`
```
```{grid-item-card}
:shadow: sm

`sd-shadow-sm`
```
```{grid-item-card}
:shadow: md

`sd-shadow-md`
```
```{grid-item-card}
:shadow: lg

`sd-shadow-lg`
```
````

````{grid} 2 2 2 2
:gutter: 4

```{grid-item-card}
:shadow: none

`sd-shadow-none`
```
```{grid-item-card}
:shadow: sm

`sd-shadow-sm`
```
```{grid-item-card}
:shadow: md

`sd-shadow-md`
```
```{grid-item-card}
:shadow: lg

`sd-shadow-lg`
```
````

````{grid} 1 1 1 1
:gutter: 4

```{grid-item-card}
:shadow: none

`sd-shadow-none`
```
```{grid-item-card}
:shadow: sm

`sd-shadow-sm`
```
```{grid-item-card}
:shadow: md

`sd-shadow-md`
```
```{grid-item-card}
:shadow: lg

`sd-shadow-lg`
```
````

````{grid} 4 4 4 4
:gutter: 4

```{grid-item-card}
:shadow: none

`sd-shadow-none`
```
```{grid-item-card}
:shadow: sm

`sd-shadow-sm`
```
```{grid-item-card}
:shadow: md

`sd-shadow-md`
```
```{grid-item-card}
:shadow: lg

`sd-shadow-lg`
```
````

````{grid} 6 6 6 2
:gutter: 4

```{grid-item-card}
:shadow: none

`sd-shadow-none`
```
```{grid-item-card}
:shadow: sm

`sd-shadow-sm`
```
```{grid-item-card}
:shadow: md

`sd-shadow-md`
```
```{grid-item-card}
:shadow: lg

`sd-shadow-lg`
```
````

```{tableofcontents}

```

`````{code-cell} ipython3
:::::{grid} 2 3 3 4

::::{grid-item}

:::{card} Title
:img-background: sphinx-design/docs/images/particle_background.jpg
:class-card: sd-text-black

Text
:::

::::

::::{grid-item-card} Title
:img-top: sphinx-design/docs/images/particle_background.jpg

Header
^^^
Content
+++++++
Footer
::::

::::{grid-item-card} Title
:img-bottom: sphinx-design/docs/images/particle_background.jpg

Header
^^^^^^
Content
+++++++
Footer

::::

:::::


```{exercise}
:class: orange

This is an example of how to introduce custom CSS.
```

First two tabs showing off defining a function.

````{tab} Python
```python
def main():
    return
```
`````

````{tab} C++
```c++
int main(const int argc, const char **argv) {
  return 0;
}
```
````

Second two tabs showing off printing.

````{tab} Python
```python
print("Hello World!")
```
````

````{tab} C++
```c++
#include <iostream>

int main() {
  std::cout << "Hello World!" << std::endl;
}
```
````

`````{code-cell} ipython3
:::::{grid} 2 3 3 4

::::{grid-item}

:::{card} Title
:img-background: sphinx-design/docs/images/particle_background.jpg
:class-card: sd-text-black

Text
:::

::::

::::{grid-item-card} Title
:img-top: sphinx-design/docs/images/particle_background.jpg

Header
^^^
Content
+++++++
Footer
::::

::::{grid-item-card} Title
:img-bottom: sphinx-design/docs/images/particle_background.jpg

Header
^^^
Content
+++
Footer
::::

:::::


```{exercise}
:class: blue

This is an example of how to introduce custom CSS.
```

First two tabs showing off defining a function.

````{tab} Python
```python
def main():
    return
```
`````

````{tab} C++
```c++
int main(const int argc, const char **argv) {
  return 0;
}
```
````

Second two tabs showing off printing.

````{tab} Python
```python
print("Hello World!")
```
````

````{tab} C++
```c++
#include <iostream>

int main() {
  std::cout << "Hello World!" << std::endl;
}
```
````

::::{grid} 2
:gutter: 1

:::{grid-item-card}
A
:::
:::{grid-item-card}
B
:::
::::

::::{grid} 2
:gutter: 3 3 4 5

:::{grid-item-card}
A
:::
:::{grid-item-card}
B
:::
::::

## This is a test
