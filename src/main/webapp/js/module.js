
//层级
function formateGrade(val) {
    if(val==0){
        return "根节点";
    }
    if(val==1){
        return "一级节点";
    }
    if(val==2){
        return "二级节点";
    }
}

//添加-打开弹窗
function openAddModuleDailog () {
    openAddOrUpdateDlg('dlg','添加模块')
}

//更新


//添加&更新-保存
function saveOrUpdateModule () {
    saveOrUpdateData("fm",ctx+"/module/saveOrUpdateModule","dlg",queryModulesByParams)
}

//查询
function queryModulesByParams () {
    $('#dg').datagrid('load', {
        moduleName: $('#moduleName').val(),
        pid: $('#pid').val(),
        grade: $('#grade').combobox('getValue'),
        optValue: $('#optValue').val(),
    });
}

//二级联动
$(function () {
    // 隐藏上级菜单-选项框
    $('#parentMenu').hide();
    //绑定事件
    $('#grade02').combobox({
        onChange:function (val) {
            console.log(val);
            if(val==0){
                // 隐藏上级菜单-选项框
                $('#parentMenu').hide();
            }else{
                //显示上级菜单
                $('#parentMenu').show();
                //查询模块数据,补全联动
                $('#parentId02').combobox({
                    url:ctx + '/module/queryModuleByGrade?grade='+(val-1),// 查询'#grade02'的上级
                    valueField:'id',
                    textField:'moduleName'
                });
            }
        }
    })
})

function deleteModule () {
    // 获取勾选的条数
    var rows = $('#dg').datagrid('getSelections');
    if(rows.length<1){
        $.messager.alert('来自Crm',"请选择一条数据进行删除");
        return;
    }
    if(rows.length>1){
        $.messager.alert('来自Crm',"只能选择一条数据进行删除");
        return;
    }
    if(rows.length=1){
        $.messager.confirm("来自crm","确定删除选中的"+rows.length+"条记录?",function (r) {
            if(r){
                $.ajax({
                    type:"post",
                    url:ctx + '/module/deleteModule?optValue='+rows[0].optValue,
                    dataType:"json",
                    success:function (data) {
                        if(data.code==200){
                            $.messager.alert('来自Crm', data.msg, 'info',function () {
                                // 刷新数据
                                $('#dg').datagrid('load');
                            })
                        }else{
                            $.messager.alert("来自crm",data.msg,"error");
                        }
                    }
                })
            }
        })
    }
}