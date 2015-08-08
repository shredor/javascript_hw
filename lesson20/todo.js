$(function() {

    var ToDo = function() {

        var model = [
            { text: 'Купить  молоко' },
            { text: 'Одеть трусы' },
            { text: 'Сходить на работу' }
        ];

        var inputField = $('.task-form__text');

        function getLength() {
            return model.length;
        }

        function renderList() {

            var list = '';

            $.each(model, function(index, item) {
                list += itemTemplate(index, item);
            });

            $('.table__body').html(list);
        }

        function itemTemplate(index, item) {
            var string = '<tr><th>:position</th><td>:text</td><td><button type="button" class="btn btn-info">&#8593;</button></td><td><button type="button" data-index=":index" class="btn btn-danger">☓</button></td></tr>';

            return string.replace(/:position/gi, index + 1).replace(':text', item.text).replace(/:index/gi, index);
        }

        function appendRenderItem(index, item) {
            $('.table__body').append(itemTemplate(index, item));
        }

        function addItem(text) {
            var item = { text: text };
            model.push(item);
            appendRenderItem(getLength() - 1, item);
        }

        function onFormSubmit(e) {
            e.preventDefault();
            var text = inputField.val();
            addItem(text);
            $(this).trigger('reset');
        }

        function onInputFieldChange(e) {
            $('.btn-primary').prop('disabled', !($(this).val().replace(/\s/gi,'')));
        }

        function onRemoveItem() {
            var index = $(this).data('index');

            model.splice(index, 1);

            initList();
        }

        function initList() {
            renderList();
            $('.btn-danger').on('click', onRemoveItem);
        }

        function init() {
            $('.task-form').submit(onFormSubmit);

            inputField.keyup(onInputFieldChange);
            initList();
        }

        init();
    };

    var todo = new ToDo();

});