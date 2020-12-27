/**
 * 纯函数
 * 1、确定的输入，一定会产生确定的输出
 * 2、函数在执行过程中，不能产生副作用
 */

// sum 是一个纯函数；因为输入输出确定，并且返回的值一定是 num1 与 num2 这两个参数的和
function sum(num1, num2) {
  return num1 + num2;
}

// add 不是一个纯函数；因为输入相同，但是输出受到 flag 的影响，并不能保证确定输出
let flag = 10;
function add(num) {
  return num + flag;
}
// 将 add 改成纯函数：只需要将 let flag 改为 const flag，因为 const 决定了 flag 不可重新赋值，那么 flag 永远都是 10，那么输入输出可以确定

// changeInfo 不是一个纯函数；因为这个函数存在副作用
function changeInfo(info) {
  info.name = 'jack';
}
