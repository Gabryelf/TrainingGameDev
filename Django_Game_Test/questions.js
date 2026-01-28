// База из 60 упрощенных вопросов по Django для начинающих
const questionsDatabase = {
    basics: {
        1: [
            {
                question: "Как создать новый проект Django?",
                answer: "В терминале выполнить команду: django-admin startproject projectname"
            },
            {
                question: "Что такое manage.py?",
                answer: "Это скрипт для управления проектом Django. Через него запускают сервер, создают приложения, применяют миграции и т.д."
            },
            {
                question: "Как запустить сервер разработки Django?",
                answer: "python manage.py runserver"
            },
            {
                question: "Как создать новое приложение в Django?",
                answer: "python manage.py startapp appname"
            },
            {
                question: "Что нужно добавить в INSTALLED_APPS после создания приложения?",
                answer: "Название приложения (например: 'products') в файле settings.py"
            },
            {
                question: "Для чего нужен файл urls.py?",
                answer: "Для определения URL-адресов (маршрутов) и их связи с представлениями (views)."
            },
            {
                question: "Как сделать миграции после создания модели?",
                answer: "python manage.py makemigrations затем python manage.py migrate"
            },
            {
                question: "Как войти в административную панель Django?",
                answer: "Перейти по адресу /admin и использовать логин/пароль суперпользователя."
            },
            {
                question: "Как создать суперпользователя?",
                answer: "python manage.py createsuperuser"
            },
            {
                question: "Что такое фикстуры (fixtures) в Django?",
                answer: "Это файлы с тестовыми данными в форматах JSON, XML или YAML для загрузки в базу данных."
            }
        ],
        2: [
            {
                question: "Объясните структуру проекта Django.",
                answer: "Проект содержит: manage.py, папку проекта (с settings.py, urls.py, wsgi.py), приложения (каждое со своими models.py, views.py, urls.py, templates и т.д.)"
            },
            {
                question: "Как загрузить фикстуры в базу данных?",
                answer: "python manage.py loaddata fixturename.json"
            },
            {
                question: "Что такое middleware и для чего он нужен?",
                answer: "Middleware - это слои, которые обрабатывают запросы и ответы. Например, для аутентификации, безопасности, сессий."
            },
            {
                question: "Как настроить статические файлы (CSS, JS, изображения)?",
                answer: "В settings.py указать STATIC_URL и STATICFILES_DIRS. В шаблоне использовать {% load static %} и {% static 'path/to/file' %}"
            },
            {
                question: "Что делает команда python manage.py shell?",
                answer: "Запускает интерактивную оболочку Python с загруженными настройками Django, чтобы работать с моделями и ORM."
            },
            {
                question: "Как создать свою собственную команду для manage.py?",
                answer: "Создать файл management/commands в приложении и в нем класс Command с методом handle."
            },
            {
                question: "Что такое DEBUG в settings.py и когда его нужно отключать?",
                answer: "DEBUG показывает подробные ошибки. Его нужно отключать на продакшене (DEBUG = False) для безопасности."
            },
            {
                question: "Как добавить поддержку другого языка в проекте?",
                answer: "В settings.py добавить язык в LANGUAGES и использовать {% trans %} в шаблонах, затем создать файлы перевода."
            },
            {
                question: "Что такое CSRF защита и как она работает?",
                answer: "Защита от межсайтовой подделки запросов. Django добавляет токен в формы, который проверяется при отправке."
            },
            {
                question: "Как создать кастомную страницу 404?",
                answer: "Создать шаблон 404.html в корне templates и установить DEBUG = False в settings.py."
            }
        ],
        3: [
            {
                question: "Представьте, что вы начинаете новый проект интернет-магазина. Опишите первые 5 шагов, которые вы сделаете после создания проекта.",
                answer: "1) Создать приложения: products, cart, orders, users. 2) Настроить базу данных (SQLite для разработки). 3) Добавить приложения в INSTALLED_APPS. 4) Создать базовые модели для товаров. 5) Настроить административную панель для управления товарами."
            },
            {
                question: "Как бы вы организовали структуру проекта для лучшей поддерживаемости?",
                answer: "Разделить на приложения по функциональности. Создать общие шаблоны в папке templates. Вынести повторяющийся код в отдельные модули. Использовать контекстные процессоры для общих данных."
            },
            {
                question: "Какие настройки безопасности нужно обязательно проверить перед деплоем проекта?",
                answer: "DEBUG = False, SECRET_KEY должен быть защищен, ALLOWED_HOSTS настроен, CSRF и CORS настройки, настройки сессий и куки, безопасность статических файлов."
            },
            {
                question: "Как реализовать систему скидок в интернет-магазине на Django?",
                answer: "Создать модель Discount с полями: код, процент/фиксированная сумма, даты действия. В модели Order добавить поле discount. При оформлении заказа проверять и применять скидку."
            },
            {
                question: "Что бы вы использовали для реализации поиска товаров и почему?",
                answer: "Для простого поиска - фильтрацию по полям модели с помощью Q объектов. Для сложного поиска - django-filter или полнотекстовый поиск через PostgreSQL, если нужна высокая производительность."
            },
            {
                question: "Как организовать работу с изображениями товаров?",
                answer: "Использовать ImageField в модели Product. Установить Pillow для обработки. Настроить MEDIA_URL и MEDIA_ROOT. Для оптимизации использовать django-imagekit для создания миниатюр."
            },
            {
                question: "Каким образом можно ускорить загрузку страниц каталога товаров?",
                answer: "Использовать пагинацию (Django Paginator), кэширование (django-redis), оптимизировать запросы к БД (select_related, prefetch_related), сжимать статические файлы."
            },
            {
                question: "Как реализовать систему отзывов к товарам?",
                answer: "Создать модель Review с ForeignKey к Product и User. Добавить поля: текст, оценка (1-5), дата. В представлении товара выводить отзывы. Добавить форму для создания отзыва."
            },
            {
                question: "Что делать, если нужно добавить новое поле в модель, которая уже используется в продакшене?",
                answer: "Добавить поле с null=True или default значением. Создать миграцию. Протестировать на стейджинге. Задеплоить и применить миграции в нерабочее время. Если нужно перенести данные - написать кастомную миграцию."
            },
            {
                question: "Как организовать систему уведомлений для пользователей (о статусе заказа, новых товарах)?",
                answer: "Создать модель Notification. Использовать сигналы (post_save) для создания уведомлений. Реализовать просмотр уведомлений в личном кабинете. Для email уведомлений использовать django-celery для асинхронной отправки."
            }
        ]
    },
    
    models: {
        1: [
            {
                question: "Что такое модель в Django?",
                answer: "Модель - это класс Python, который представляет таблицу в базе данных. Каждый атрибут класса - поле в таблице."
            },
            {
                question: "Как создать текстовое поле в модели?",
                answer: "name = models.CharField(max_length=100)"
            },
            {
                question: "Что такое primary key?",
                answer: "Первичный ключ - уникальный идентификатор для каждой записи. Django автоматически создает поле 'id' как первичный ключ."
            },
            {
                question: "Как создать поле для хранения цены товара?",
                answer: "price = models.DecimalField(max_digits=10, decimal_places=2)"
            },
            {
                question: "Что такое ForeignKey и для чего он используется?",
                answer: "ForeignKey создает связь 'многие к одному'. Например, у многих товаров может быть один производитель."
            },
            {
                question: "Как добавить поле с датой создания записи?",
                answer: "created_at = models.DateTimeField(auto_now_add=True)"
            },
            {
                question: "Что делает метод __str__ в модели?",
                answer: "Возвращает строковое представление объекта, которое показывается в административной панели."
            },
            {
                question: "Как создать поле с выбором из нескольких вариантов?",
                answer: "status = models.CharField(max_length=20, choices=STATUS_CHOICES)"
            },
            {
                question: "Что такое ManyToManyField?",
                answer: "Поле для связи 'многие ко многим'. Например, у товара может быть несколько категорий и категория может содержать несколько товаров."
            },
            {
                question: "Как задать сортировку по умолчанию для модели?",
                answer: "В классе Meta: ordering = ['-created_at']"
            }
        ],
        2: [
            {
                question: "Объясните разницу между null=True и blank=True.",
                answer: "null=True разрешает NULL в базе данных, blank=True разрешает пустое значение в формах. Для CharField обычно используют blank=True."
            },
            {
                question: "Как создать связь между товаром и категорией?",
                answer: "category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')"
            },
            {
                question: "Что такое related_name и для чего он нужен?",
                answer: "Имя для обратной связи. Например, если у Category есть ForeignKey от Product, то category.products.all() вернет все товары этой категории."
            },
            {
                question: "Как создать модель для корзины покупок?",
                answer: "Модель Cart с ForeignKey к User и CartItem с ForeignKey к Cart и Product, а также quantity."
            },
            {
                question: "Что такое on_delete=models.CASCADE?",
                answer: "При удалении родительского объекта будут удалены все связанные дочерние объекты."
            },
            {
                question: "Как добавить поле с изображением товара?",
                answer: "image = models.ImageField(upload_to='products/', blank=True)"
            },
            {
                question: "Что такое verbose_name и где его использовать?",
                answer: "Человекочитаемое имя для поля. Можно указать в модели: name = models.CharField(verbose_name='Название товара', max_length=100)"
            },
            {
                question: "Как создать уникальное поле (например, slug для товара)?",
                answer: "slug = models.SlugField(unique=True)"
            },
            {
                question: "Что такое менеджер моделей (objects) и как создать свой?",
                answer: "Менеджер - интерфейс для запросов к БД. Свой менеджер: class ActiveProductsManager(models.Manager): def get_queryset(self): return super().get_queryset().filter(is_active=True)"
            },
            {
                question: "Как сделать поле обязательным для заполнения?",
                answer: "Не указывать blank=True и null=True (для CharField). Или указать blank=False (по умолчанию)."
            }
        ],
        3: [
            {
                question: "Как бы вы спроектировали модель для товаров интернет-магазина с вариациями (размер, цвет)?",
                answer: "Создать Product (основная информация) и ProductVariant (варианты с ценой, остатком, размером, цветом). ProductVariant имеет ForeignKey к Product."
            },
            {
                question: "Как реализовать систему рейтинга товаров?",
                answer: "Создать модель Rating с ForeignKey к Product и User, полем value (1-5). В Product добавить метод для расчета среднего рейтинга."
            },
            {
                question: "Что делать, если нужно хранить дополнительные характеристики товаров (вес, размеры, материал)?",
                answer: "Создать модель ProductAttribute и ProductAttributeValue. Или использовать JSONField для гибкого хранения характеристик."
            },
            {
                question: "Как организовать историю изменений цены товара?",
                answer: "Создать модель PriceHistory с ForeignKey к Product, полями price, created_at. При сохранении товара создавать запись в истории."
            },
            {
                question: "Каким образом можно оптимизировать запросы к базе данных при выводе каталога товаров?",
                answer: "Использовать select_related для ForeignKey и prefetch_related для ManyToMany. Использовать only() для выбора нужных полей. Кэшировать результаты."
            },
            {
                question: "Как реализовать систему скидок на уровне модели?",
                answer: "Создать модель Discount. В Product добавить метод get_price_with_discount, который проверяет активные скидки и возвращает цену со скидкой."
            },
            {
                question: "Что делать, если нужно добавить мягкое удаление (soft delete) товаров?",
                answer: "Добавить поле is_deleted или deleted_at. Переопределить менеджер, чтобы исключать удаленные записи из запросов. Переопределить метод delete() для установки флага вместо реального удаления."
            },
            {
                question: "Как организовать систему тегов для товаров?",
                answer: "Создать модель Tag. В Product добавить ManyToManyField к Tag. Реализовать поиск товаров по тегам."
            },
            {
                question: "Каким образом можно реализовать систему 'похожие товары'?",
                answer: "Через ManyToManyField с симметричной связью или через алгоритм, который ищет товары из той же категории/с похожими тегами."
            },
            {
                question: "Как обеспечить целостность данных при удалении категории, в которой есть товары?",
                answer: "Использовать on_delete=models.PROTECT, чтобы запретить удаление, или on_delete=models.SET_NULL, чтобы установить товарам category=None, или переместить товары в другую категорию перед удалением."
            }
        ]
    },
    
    views: {
        1: [
            {
                question: "Что такое view (представление) в Django?",
                answer: "Функция или класс, который принимает веб-запрос и возвращает веб-ответ (HTML страницу, JSON и т.д.)."
            },
            {
                question: "Как создать простую view-функцию, которая возвращает 'Привет, мир!'?",
                answer: "def hello_world(request): return HttpResponse('Привет, мир!')"
            },
            {
                question: "Как передать данные из view в шаблон?",
                answer: "return render(request, 'template.html', {'data': value})"
            },
            {
                question: "Как обработать GET параметры в view?",
                answer: "search_query = request.GET.get('q', '')"
            },
            {
                question: "Что такое декоратор @login_required?",
                answer: "Ограничивает доступ к view только для авторизованных пользователей. Если пользователь не авторизован, перенаправляет на страницу входа."
            },
            {
                question: "Как создать view для отображения списка товаров?",
                answer: "def product_list(request): products = Product.objects.all() return render(request, 'products/list.html', {'products': products})"
            },
            {
                question: "Что такое HttpResponse?",
                answer: "Класс для создания HTTP ответов. Может возвращать HTML, JSON, файлы и т.д."
            },
            {
                question: "Как сделать перенаправление (редирект) в view?",
                answer: "from django.shortcuts import redirect\nreturn redirect('view_name') или return redirect('/url/')"
            },
            {
                question: "Как обработать POST запрос в view?",
                answer: "if request.method == 'POST':\n    # обработать данные формы\n    return redirect('success_url')"
            },
            {
                question: "Что такое Class-Based Views (CBV)?",
                answer: "Представления на основе классов. Предоставляют готовую структуру для общих задач (ListView, DetailView, CreateView)."
            }
        ],
        2: [
            {
                question: "Как создать view для детального просмотра товара?",
                answer: "def product_detail(request, product_id):\n    product = get_object_or_404(Product, id=product_id)\n    return render(request, 'products/detail.html', {'product': product})"
            },
            {
                question: "Что такое get_object_or_404 и зачем он нужен?",
                answer: "Функция, которая получает объект или возвращает 404 ошибку, если объект не найден. Упрощает обработку несуществующих объектов."
            },
            {
                question: "Как реализовать пагинацию в view?",
                answer: "from django.core.paginator import Paginator\npaginator = Paginator(products, 10)\npage = request.GET.get('page')\nproducts_page = paginator.get_page(page)"
            },
            {
                question: "Что такое FormView и когда его использовать?",
                answer: "CBV для работы с формами. Используется, когда нужно отобразить форму, обработать отправку и показать результат."
            },
            {
                question: "Как создать view для регистрации пользователя?",
                answer: "Использовать UserCreationForm. В POST обработать форму, создать пользователя, выполнить вход и перенаправить на главную."
            },
            {
                question: "Что такое миксины (mixins) в CBV?",
                answer: "Классы, которые добавляют дополнительную функциональность через множественное наследование. Например, LoginRequiredMixin для проверки авторизации."
            },
            {
                question: "Как передать дополнительные данные в шаблон в CBV?",
                answer: "Переопределить метод get_context_data: def get_context_data(self, **kwargs): context = super().get_context_data(**kwargs); context['extra'] = 'data'; return context"
            },
            {
                question: "Как создать API endpoint, возвращающий JSON?",
                answer: "from django.http import JsonResponse\ndef api_products(request): products = Product.objects.all().values() return JsonResponse(list(products), safe=False)"
            },
            {
                question: "Что такое context в render()?",
                answer: "Словарь с данными, которые передаются в шаблон и становятся доступными как переменные."
            },
            {
                question: "Как ограничить доступ к view только для администраторов?",
                answer: "Использовать декоратор @staff_member_required или permission_required('is_staff')"
            }
        ],
        3: [
            {
                question: "Как бы вы реализовали view для корзины покупок с добавлением, удалением и изменением количества товаров?",
                answer: "Создать view для отображения корзины (GET). Для добавления: view, которая принимает product_id и quantity через POST. Для изменения: view, которая изменяет quantity. Для удаления: view, которая удаляет товар из корзины. Использовать сессии для хранения корзины."
            },
            {
                question: "Как организовать процесс оформления заказа в интернет-магазине?",
                answer: "1) View для отображения формы заказа. 2) Проверка корзины и остатков товаров. 3) Создание модели Order и OrderItem. 4) Очистка корзины. 5) Отправка уведомлений. 6) Перенаправление на страницу успеха."
            },
            {
                question: "Что делать, если нужно реализовать сложную фильтрацию товаров (по цене, категории, бренду, наличию)?",
                answer: "Использовать django-filter или вручную проверять GET параметры и формировать Q объекты для запроса. Создать форму фильтрации и валидировать данные."
            },
            {
                question: "Как реализовать view для личного кабинета пользователя с историей заказов?",
                answer: "View, доступная только авторизованным пользователям. Получать заказы пользователя: orders = Order.objects.filter(user=request.user). В шаблоне отображать список заказов с деталями."
            },
            {
                question: "Каким образом можно оптимизировать view для каталога товаров, если товаров больше 1000?",
                answer: "Использовать пагинацию (по 20-50 товаров на странице). Оптимизировать запросы к БД (select_related, prefetch_related). Кэшировать страницы или результаты запросов. Использовать только() для выбора нужных полей."
            },
            {
                question: "Как реализовать систему промокодов (купонов) при оформлении заказа?",
                answer: "В view оформления заказа проверять промокод из POST запроса. Проверять его валидность, срок действия, минимальную сумму заказа. Применять скидку к итоговой сумме."
            },
            {
                question: "Что делать, если нужно обрабатывать загрузку нескольких изображений для товара?",
                answer: "Использовать форму с formsets или поле MultipleFileField. В view обрабатывать request.FILES.getlist('images'). Для каждого файла создавать модель ProductImage."
            },
            {
                question: "Как организовать поиск товаров с автодополнением (autocomplete)?",
                answer: "Создать API endpoint, который принимает search запрос и возвращает JSON с подходящими товарами. Использовать Ajax запросы с фронтенда. Оптимизировать поисковый запрос с помощью icontains или полнотекстового поиска."
            },
            {
                question: "Как реализовать view для сравнения товаров?",
                answer: "Хранить ID товаров для сравнения в сессии. View для добавления/удаления товаров из списка сравнения. View для отображения сравнения - получать товары по ID и выводить их характеристики в таблице."
            },
            {
                question: "Что делать, если нужно реализовать систему 'избранных товаров' (wishlist)?",
                answer: "Создать модель Wishlist с ForeignKey к User и Product. View для добавления/удаления товаров. View для отображения избранного. Использовать AJAX для добавления без перезагрузки страницы."
            }
        ]
    },
    
    templates: {
        1: [
            {
                question: "Как вывести переменную в шаблоне Django?",
                answer: "{{ variable_name }}"
            },
            {
                question: "Как написать цикл for в шаблоне?",
                answer: "{% for item in items %} {{ item }} {% endfor %}"
            },
            {
                question: "Как написать условие if в шаблоне?",
                answer: "{% if condition %} контент {% else %} другой контент {% endif %}"
            },
            {
                question: "Как подключить статические файлы (CSS, JS)?",
                answer: "{% load static %}\n<link href=\"{% static 'css/style.css' %}\" rel=\"stylesheet\">"
            },
            {
                question: "Как наследовать шаблоны?",
                answer: "{% extends 'base.html' %}\n{% block content %} ... {% endblock %}"
            },
            {
                question: "Как включить один шаблон в другой?",
                answer: "{% include 'header.html' %}"
            },
            {
                question: "Как создать ссылку на другую страницу по имени маршрута?",
                answer: "<a href=\"{% url 'view_name' %}\">Ссылка</a>"
            },
            {
                question: "Как отобразить изображение из поля ImageField?",
                answer: "<img src=\"{{ product.image.url }}\" alt=\"{{ product.name }}\">"
            },
            {
                question: "Как вывести дату в определенном формате?",
                answer: "{{ order.created_at|date:'d.m.Y H:i' }}"
            },
            {
                question: "Как написать комментарий в шаблоне?",
                answer: "{# комментарий #} или {% comment %} многострочный комментарий {% endcomment %}"
            }
        ],
        2: [
            {
                question: "Что такое фильтры (filters) в шаблонах и как их использовать?",
                answer: "Фильтры преобразуют значения. Синтаксис: {{ variable|filter }}. Примеры: {{ name|upper }}, {{ price|floatformat:2 }}, {{ text|truncatechars:100 }}"
            },
            {
                question: "Как создать ссылку с параметрами?",
                answer: "<a href=\"{% url 'product_detail' product.id %}\">{{ product.name }}</a>"
            },
            {
                question: "Как отобразить форму в шаблоне?",
                answer: "{{ form.as_p }} или вручную: {{ form.field.label_tag }} {{ form.field }} {{ form.field.errors }}"
            },
            {
                question: "Что такое тег csrf_token и зачем он нужен?",
                answer: "{% csrf_token %} добавляет токен для защиты от CSRF атак. Обязателен для POST форм."
            },
            {
                question: "Как работать с пагинацией в шаблоне?",
                answer: "{% if page_obj.has_previous %}<a href=\"?page={{ page_obj.previous_page_number }}\">Назад</a>{% endif %}\nСтраница {{ page_obj.number }} из {{ page_obj.paginator.num_pages }}\n{% if page_obj.has_next %}<a href=\"?page={{ page_obj.next_page_number }}\">Вперед</a>{% endif %}"
            },
            {
                question: "Как использовать Bootstrap в шаблонах Django?",
                answer: "Подключить Bootstrap CSS/JS через CDN или статические файлы. Использовать Bootstrap классы в HTML. Для форм использовать django-crispy-forms или вручную добавлять Bootstrap классы."
            },
            {
                question: "Как создать шаблон для email уведомлений?",
                answer: "Создать HTML файл в templates/emails/. В view использовать render_to_string для рендеринга шаблона с контекстом. Отправить email с HTML содержимым."
            },
            {
                question: "Что такое теги url с параметрами?",
                answer: "{% url 'view_name' arg1 arg2 %} или {% url 'view_name' param1=value1 param2=value2 %}"
            },
            {
                question: "Как отобразить ManyToMany поле в шаблоне?",
                answer: "{% for category in product.categories.all %} {{ category.name }} {% endfor %}"
            },
            {
                question: "Как использовать статические файлы в CSS (например, background-image)?",
                answer: "background-image: url('{% static 'images/bg.jpg' %}');"
            }
        ],
        3: [
            {
                question: "Как бы вы организовали структуру шаблонов для интернет-магазина?",
                answer: "base.html (основа), header.html, footer.html, sidebar.html. Для страниц: products/list.html, products/detail.html, cart/view.html, checkout.html. Использовать блоки для динамического контента."
            },
            {
                question: "Как реализовать шаблон для отображения товаров в виде сетки (grid) с помощью Bootstrap?",
                answer: "<div class=\"row\">\n  {% for product in products %}\n    <div class=\"col-md-4 mb-4\">\n      <div class=\"card\">\n        <img src=\"{{ product.image.url }}\" class=\"card-img-top\">\n        <div class=\"card-body\">\n          <h5 class=\"card-title\">{{ product.name }}</h5>\n          <p class=\"card-text\">{{ product.price }} руб.</p>\n          <a href=\"{% url 'product_detail' product.id %}\" class=\"btn btn-primary\">Подробнее</a>\n        </div>\n      </div>\n    </div>\n  {% endfor %}\n</div>"
            },
            {
                question: "Каким образом можно реализовать шаблон для формы фильтрации товаров?",
                answer: "Создать форму с полями для фильтрации. В шаблоне отобразить форму как <form method=\"get\">. Для каждого поля использовать {{ form.field }}. Добавить кнопку submit. Форма будет отправлять GET параметры."
            },
            {
                question: "Как создать шаблон для модального окна (Bootstrap modal) с формой добавления в корзину?",
                answer: "Включить Bootstrap JS. Создать модальное окно с form внутри. Форма должна отправляться на URL добавления в корзину. Использовать AJAX для отправки без перезагрузки страницы."
            },
            {
                question: "Как реализовать шаблон для постраничной навигации (pagination) с Bootstrap?",
                answer: "{% if page_obj.has_other_pages %}\n<nav aria-label=\"Page navigation\">\n  <ul class=\"pagination\">\n    {% if page_obj.has_previous %}\n      <li class=\"page-item\"><a class=\"page-link\" href=\"?page={{ page_obj.previous_page_number }}\">Previous</a></li>\n    {% endif %}\n    {% for num in page_obj.paginator.page_range %}\n      <li class=\"page-item {% if page_obj.number == num %}active{% endif %}\"><a class=\"page-link\" href=\"?page={{ num }}\">{{ num }}</a></li>\n    {% endfor %}\n    {% if page_obj.has_next %}\n      <li class=\"page-item\"><a class=\"page-link\" href=\"?page={{ page_obj.next_page_number }}\">Next</a></li>\n    {% endif %}\n  </ul>\n</nav>\n{% endif %}"
            },
            {
                question: "Что делать, если нужно отображать разный контент для авторизованных и неавторизованных пользователей?",
                answer: "{% if user.is_authenticated %}\n  <p>Добро пожаловать, {{ user.username }}!</p>\n  <a href=\"{% url 'logout' %}\">Выйти</a>\n{% else %}\n  <a href=\"{% url 'login' %}\">Войти</a>\n  <a href=\"{% url 'register' %}\">Регистрация</a>\n{% endif %}"
            },
            {
                question: "Как организовать шаблон для отображения хлебных крошек (breadcrumbs)?",
                answer: "Создать тег шаблона или передавать breadcrumbs в контексте. В шаблоне: <nav aria-label=\"breadcrumb\">\n  <ol class=\"breadcrumb\">\n    {% for breadcrumb in breadcrumbs %}\n      <li class=\"breadcrumb-item {% if forloop.last %}active{% endif %}\">\n        {% if not forloop.last %}<a href=\"{{ breadcrumb.url }}\">{% endif %}\n        {{ breadcrumb.name }}\n        {% if not forloop.last %}</a>{% endif %}\n      </li>\n    {% endfor %}\n  </ol>\n</nav>"
            },
            {
                question: "Как реализовать шаблон для звездного рейтинга товара?",
                answer: "{% with rating=product.average_rating %}\n  <div class=\"star-rating\">\n    {% for i in \"12345\"|make_list %}\n      {% if forloop.counter <= rating %}\n        <i class=\"fas fa-star text-warning\"></i>\n      {% else %}\n        <i class=\"far fa-star text-warning\"></i>\n      {% endif %}\n    {% endfor %}\n    <span class=\"ml-2\">({{ product.review_count }})</span>\n  </div>\n{% endwith %}"
            },
            {
                question: "Каким образом можно реализовать шаблон для системы тегов товаров?",
                answer: "{% for tag in product.tags.all %}\n  <a href=\"{% url 'products_by_tag' tag.slug %}\" class=\"badge badge-primary\">{{ tag.name }}</a>\n{% endfor %}"
            },
            {
                question: "Как создать шаблон для отображения прогресса оформления заказа (шаги checkout)?",
                answer: "<div class=\"checkout-steps\">\n  <div class=\"step {% if step >= 1 %}active{% endif %}\">1. Корзина</div>\n  <div class=\"step {% if step >= 2 %}active{% endif %}\">2. Доставка</div>\n  <div class=\"step {% if step >= 3 %}active{% endif %}\">3. Оплата</div>\n  <div class=\"step {% if step >= 4 %}active{% endif %}\">4. Подтверждение</div>\n</div>"
            }
        ]
    }
};