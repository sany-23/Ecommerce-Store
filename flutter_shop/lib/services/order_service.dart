// lib/services/order_service.dart
import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/order_model.dart';

class OrderService {
  final String apiUrl = 'http://localhost:8080/api/orders';

  Future<List<Order>> fetchOrdersByUserId(int userId) async {
    final response = await http.get(Uri.parse('$apiUrl/user/$userId'));

    if (response.statusCode == 200) {
      List<dynamic> body = json.decode(response.body);
      return body.map((dynamic item) => Order.fromJson(item)).toList();
    } else {
      throw Exception('Failed to load orders');
    }
  }

  Future<Order> fetchOrderById(int orderId) async {
    final response = await http.get(Uri.parse('$apiUrl/$orderId'));

    if (response.statusCode == 200) {
      return Order.fromJson(json.decode(response.body));
    } else {
      throw Exception('Failed to load order');
    }
  }

  Future<Order> updateOrderStatus(int orderId, String status) async {
    final response = await http.put(
      Uri.parse('$apiUrl/$orderId/status'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({'status': status}),
    );

    if (response.statusCode == 200) {
      return Order.fromJson(json.decode(response.body));
    } else {
      throw Exception('Failed to update order status');
    }
  }
}
