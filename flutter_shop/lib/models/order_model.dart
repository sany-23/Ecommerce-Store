// lib/models/order_model.dart
class Order {
  final int id;
  final String status;
  final String paymentStatus;
  final double totalPrice;

  Order({
    required this.id,
    required this.status,
    required this.paymentStatus,
    required this.totalPrice,
  });

  factory Order.fromJson(Map<String, dynamic> json) {
    return Order(
      id: json['id'],
      status: json['status'],
      paymentStatus: json['paymentStatus'],
      totalPrice: json['totalPrice'],
    );
  }
}
