{% for article in articles %}

\## \[{{ article.title }}]({{ article.url }})



{{ article.description }}



\*\*Published:\*\* {{ article.date }} | \*\*Category:\*\* {{ article.category }}



{% if article.thumbnail %}

!\[{{ article.title }}]({{ article.thumbnail }})

{% endif %}



\---

{% endfor %}

