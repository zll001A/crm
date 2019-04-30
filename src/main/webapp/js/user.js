// 清空表单
$(function () {
    $('#dlg').dialog({
        'onClose':function () {
            $('#fm').form('clear');
        }
    })
});
//查询
function queryUsersByParams () {
    $('#dg').datagrid('load',{
        userName: $('#userName').val(),
        email: $('#email').val(),
        phone: $('#phone').val()
    })
}

// 添加
function openAddUserDailog () {
    openAddOrUpdateDlg('dlg', '添加用户')
}
function saveOrUpdateUser () {
    saveOrUpdateData('fm',ctx+'/user/saveOrUpdateUser','dlg',queryUsersByParams);
}

//更新
function openModifyUserDialog () {
    openModifyDialog('dg','fm','dlg','更新用户')
}

//删除
function deleteUser () {
    deleteData('dg',ctx + '/user/deleteUser',queryUsersByParams)
}