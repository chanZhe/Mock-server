$(function () {
    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
    
    let api_list = []

    // 获取所有api接口
    function getAllApis () {
        $.get('/findAll', res => {
            if (res && res.code === '200') {
                api_list = res.data
                var html = template('api-list', res)
                $('#accordion').html(html)
            }
        })
    }

    getAllApis()

    $("[handle-type='submit']").click(() => {
        $('#createForm').submit()
    })

    $('#createForm').submit(function (event) {
        event.preventDefault()
        const form = $(this)
        $.post({
            url: '/create',
            data: form.serializeObject()
        }).then(res => {
            if(res.code === '200') {
                form[0].reset()
                form.modal('hide')
                getAllApis()
            } else {
                alert(res.msg)
            }
        })
    })

    $(document).on('click', '.delete-btn' , function() {
        const id = $(this).attr('data-id')
        $.post({
            url: '/delete',
            data: {id}
        }).then(res => {
            if(res.code === '200') {
                getAllApis()
            } else {
                alert(res.msg)
            }
        })
    })

    $(document).on('click', '.edit-btn', function() {
        const id = $(this).attr('data-id')
        let api_data = api_list.filter(item => item.id === Number(id))[0]
        console.log(api_data)
        Object.keys(api_data).forEach(data => {
            $('#editForm').find(`[name=${data}]`).val(api_data[data])
        })
        $('#editModal').modal('show')
    })

    $("[handle-type='edit']").click(() => {
        $('#editForm').submit()
    })

    $('#editForm').submit(function (event) {
        event.preventDefault()
        const form = $(this)
        $.post({
            url: '/edit',
            data: form.serializeObject()
        }).then(res => {
            if(res.code === '200') {
                form[0].reset()
                form.modal('hide')
                getAllApis()
            } else {
                alert(res.msg)
            }
        })
    })
})