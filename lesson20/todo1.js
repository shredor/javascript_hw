$(function() {

    var ToDo = function() {

        this.model = [
            { text: 'Купить  молоко' },
            { text: 'Одеть трусы' },
            { text: 'Сходить на работу' }
        ];

        this.inputField = $('.task-form__text');

        this.form = $('.task-form');

        this.init();
    };

    ToDo.prototype.getLength = function () {
        return this.model.length;
    };

    ToDo.prototype.renderList =function () {

        var list = '',
            __self = this;

        $.each(this.model, function(index, item) {
            list += __self.getItemTemplate(index, item);
        });

        $('.table__body').html(list);
    };

    ToDo.prototype.getItemTemplate = function (index, item) {
        var string = '<tr><th>:position</th><td>:text</td><td><button type="button" class="btn btn-info">&#8593;</button></td><td><button type="button" data-index=":index" class="btn btn-danger">☓</button></td></tr>';

        return string.replace(/:position/gi, index + 1).replace(':text', item.text).replace(/:index/gi, index);
    };

    ToDo.prototype.appendRenderItem = function (index, item) {
        $('.table__body').append(this.getItemTemplate(index, item));
    };

    ToDo.prototype.addItem = function (text) {
        var item = { text: text };
        this.model.push(item);
        this.appendRenderItem(this.getLength() - 1, item);
    };

    ToDo.prototype.onFormSubmit = function (e) {
        e.preventDefault();
        var text = this.inputField.val();
        this.addItem(text);
        this.form.trigger('reset');
    };

    ToDo.prototype.oninputFieldChange = function (e) {
        $('.btn-primary').prop('disabled', !($(this).val().replace(/\s/gi,'')));
    };

    ToDo.prototype.onRemoveItem = function () {
        var index = $(this).data('index');

        this.model.splice(index, 1);

        this.initList();
    };

    ToDo.prototype.initList = function () {
        var __self = this;

        this.renderList();
        $('.btn-danger').on('click', function(e) {
            __self = __self.onRemoveItem.call(__self, e);
        });
    };

    ToDo.prototype.init = function () {
        var __self = this;

        this.form.submit(function(e) {
            __self.onFormSubmit.call(__self, e);
        });

        this.inputField.keyup(__self.oninputFieldChange);
        this.initList();
    };

    var todo = new ToDo();

});