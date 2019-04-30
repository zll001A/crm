//搜索
function queryCustomersByParams () {
    $('#dg').datagrid('load',{
        name: $('#cusName').val(),
        khno: $('#khno').val(),
        fr: $('#fr').val()
    })
}

//[打开弹窗]添加
function openAddCustomerDialog() {
    openAddOrUpdateDlg('dlg',"添加客户")
}
//[打开弹窗]更新
function openModifyCustomerDialog () {
    openModifyDialog('dg','fm', 'dlg', "更新客户")
}

//[保存]添加&更新
function saveOrUpdateCustomer() {
    saveOrUpdateData('fm',ctx +'/customer/saveOrUpdateCustomer', 'dlg', queryCustomersByParams)
}

//[删除]
function deleteCustomer () {
    deleteData("dg",ctx+'/customer/deleteCustomer',queryCustomersByParams)
}


//历史订单查看
function openCustomerOtherInfo (name, type) {
    var rows = $('#dg').datagrid("getSelections");
    if (rows.length == 0) {
        $.messager.alert('来自Crm', "请选择一条数据");
        return;
    }
    if (rows.length > 1) {
        $.messager.alert('来自Crm', "只能选择一条数据");
        return;
    }

    var cusId = rows[0].id;
    if(type==3){
        window.parent.openTab(name+'_'+cusId,ctx+"/customerOrder/index?cusId="+cusId);
    }
}