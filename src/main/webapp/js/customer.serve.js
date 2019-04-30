/*==============================服务创建=====================================*/
function saveCustomerServe () {
    $('#fm').form("submit",{
        url:ctx+'/customerServe/saveOrUpdateCustomerServe',
        onSubmit:function(){
            return $(this).form("validate");
        },
        success:function (data) {
            /**
             * data 为原始的json 字符串
             *   需要转换为js 对象
             */
            data=JSON.parse(data);
            if(data.code==200){
                $.messager.alert('来自Crm', data.msg, 'info', function () {
                    // 1. 清空表单数据
                    $('#fm').form('clear');
                })
            }else{
                $.messager.alert("来自crm",data.msg,"error");
            }
        }
    })
}
/*==============================服务分配=====================================*/
function openCustomerServeAssignDialog () {
    openModifyDialog('dg','fm','dlg','服务分配');
}

function addCustomerServeAssign () {
    saveOrUpdateData('fm',ctx+'/customerServe/saveOrUpdateCustomerServe','dlg', function () {
        $('#dg').datagrid('load')
    });
}
/*==============================服务处理=====================================*/
function openCustomerServeProceDialog () {
    openModifyDialog('dg','fm','dlg','服务处理');
}
function addCustomerServeProce () {
    addCustomerServeAssign();
}
/*==============================服务反馈=====================================*/
function openCustomerServeFeedBackDialog () {
    openModifyDialog('dg','fm','dlg','服务反馈');
}
function addCustomerServeFeedBack () {
    addCustomerServeAssign();
}
/*==============================服务归档=====================================*/
function queryCustomerServesByParams () {
    $('#dg').datagrid('load', {
        customer: $('#cusName').val(),
        myd: $('#myd').combobox('getValue'),
        createDate: $('#time').datetimebox('getValue')
    })
}