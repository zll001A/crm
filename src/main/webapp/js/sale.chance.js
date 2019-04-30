// 格式化数据显示
// val 当前值
// row 当前行的值
// index 当前行的索引
function formatState(val,row,index) {
    if(val==0){
        return "未分配";
    }
    if(val==1){
        return "已分配";
    }
}

function formatResult(val) {
    if(val==0){
        return "未开发";
    }
    if(val==1){
        return "开发中";
    }
    if(val==2){
        return "开发成功";
    }
    if(val==3){
        return "开发失败";
    }
}

//搜索
function querySaleChancesByParams() {
    $('#dg').datagrid('load', {
        customerName: $('#customerName').val(),
        state: $('#state').combobox('getValue'),
        devResult: $('#devResult').combobox('getValue'),
        createDate: $('#time').datebox("getValue")
    });
}

// 在function里面的代码,会在页面加载完成后触发
$(function () {
    $('#dg').datagrid({
        rowStyler: function(index,row){

            var devResult = row.devResult;
            if (devResult == 0) {
                return "background-color:#5bc0de;"; // 蓝色
            } else if (devResult == 1) {
                return "background-color:#f0ad4e;"; // 黄色
            } else if (devResult == 2) {
                return "background-color:#5cb85c;"; // 绿色
            } else if (devResult == 3) {
                return "background-color:#d9534f;"; // 红色
            }
        }
    });
})

//打开添加框
function openAddSaleChanceDialog() {
    $('#dlg').dialog('open');
}

//保存修改内容
function saveOrUpdateSaleChance() {
    $('#fm').form('submit', {
        url: ctx + "/saleChance/addOrUpdateSaleChance",
        onSubmit: function () {
            return $(this).form('validate');// 返回false终止表单提交
        },
        success: function (data) {
            data = JSON.parse(data);
            console.log(data);      //测试
            if(data.code==200){
                $.messager.alert('来自Crm', data.msg, 'info',function () {
                    // 1. 清空表单数据
                    $('#fm').form('clear');
                    // 2. 关闭弹窗
                    $('#dlg').dialog('close');
                    // 3. 刷新数据
                    $('#dg').datagrid('load');
                })
            }else{
                $.messager.alert('来自Crm', data.msg, 'error')
            }
        }
    });
}

//打开更新弹窗
function openModifySaleChanceDialog() {

    $('#dlg').dialog({
        title: '更新营销记录'
    });

    /**
     * 1.获取值
     *  -----写入表单
     * 2.传后台
     *      success关窗口,刷数据
     *      error报错
     ***/
    var rows = $('#dg').datagrid('getSelections');
    if(rows.length<1){
        $.messager.alert('来自Crm',"请选择一条数据进行更新");
        return;
    }
    if(rows.length>1){
        $.messager.alert('来自Crm',"只能选择一条数据进行更新");
        return;
    }

    $('#fm').form('load',rows[0]);//-----写入表单

    $('#dlg').dialog('open'); //打开弹窗
}


//关闭弹窗
function closeDlg() {
    $('#dlg').dialog('close');
}

//删除
function deleteSaleChance() {
    /**
     * 1.获取勾选的条数(进行相应判断)
     * 2.打开删除提示框(进行相应判断)
     * 3.传后台
     * 4.删除成功(刷新数据)
     ***/
    var rows = $('#dg').datagrid('getSelections');
    if(rows.length<1){
        $.messager.alert('来自Crm',"请选择一条数据进行删除");
        return;
    }
    if(rows.length>=1){
        $.messager.confirm('来自Crm','确定删除'+rows.length+'条数据?',function (r) {
            if(r){
                var ids='';
                for(var i = 0;i<rows.length;i++){
                    //ids=1& ids=2
                    ids+="ids="+rows[i].id+"&";
                }
                $.ajax({
                    url: ctx + "/saleChance/deleteBatchSaleChance?"+ids,
                    type:"post",
                    success:function(data){
                        if(data.code==200){
                            $.messager.alert('来自Crm', data.msg, 'info',function () {
                                //刷新数据
                                $('#dg').datagrid('load');
                            })
                        }else{
                            $.messager.alert('来自Crm', data.msg, 'error')
                        }
                    }
                })
            }
        })
    }
}