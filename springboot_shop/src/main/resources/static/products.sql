use fastshop_db;
INSERT INTO product_category (id, name) VALUES
(1, 'CPU'),
(2, 'GPU'),
(3, 'Memory'),
(4, 'Storage'),
(5, 'Motherboard'),
(6, 'Cooling'),
(7, 'Power Supply'),
(8, 'Case'),
(9, 'Peripherals'),
(10, 'Monitor'),
(11, 'Audio'),
(12, 'Networking');

INSERT INTO product (id, name, description, price, image_url, stock, rating, reviews, category_id) VALUES
(1, 'Intel 14th Gen Core i9 14900K', 'High-performance CPU with 24 cores and 32 threads', 499.99, 'intel-core-i9-14900K.webp', 15, 5, 100, 1),
(2, 'AMD Ryzen 9 9950X', 'Powerful CPU with 16 cores and 32 threads', 549.99, 'ryzen9-9950X.webp', 20, 5, 100, 1),
(3, 'ASUS TUF Gaming GeForce RTX 4090 OC Edition 24GB GDDR6X', 'High-end graphics card with 24GB GDDR6X memory', 699.99, 'rtx-4090-oc.webp', 10, 5, 100, 2),
(4, 'Sapphire NITRO+ AMD Radeon RX 6950 XT PURE 16GB GDDR6', 'High-performance GPU with 16GB GDDR6 memory', 649.99, 'radeon-rx-6950-xt.jpg', 8, 5, 100, 2),
(5, 'TEAM XTREEM ARGB 48GB (2x24GB) 8000MHz DDR5', 'High-speed RAM with 8000MHz frequency', 349.99, 'team-xtreem-argb-48gb.webp', 30, 5, 100, 3),
(6, 'Seagate FireCuda 530 2TB Gen4 M.2 2280 PCIe NVMe', 'Fast NVMe SSD for quick load times and transfers', 129.99, 'seagate-firecuda-530-2tb.webp', 25, 5, 100, 4),
(7, 'Seagate Exos X18 18TB 7200rpm', 'Reliable hard disk drive for large storage needs', 59.99, 'seagate-exos-X18-18tb.jpg', 40, 5, 100, 4),
(8, 'ASUS ProArt X870E-CREATOR WiFi', 'ATX motherboard compatible with AMD Ryzen processors', 109.99, 'proart-x870e-creator-wifi.webp', 12, 5, 100, 5),
(9, 'ASUS ROG MAXIMUS Z790', 'High-end motherboard for Intel processors with PCIe 4.0 support', 349.99, 'rog-maximus-z790.webp', 7, 5, 100, 5),
(10, 'Asus ROG RYUJIN III 360 ARGB AIO', 'High-performance air cooler for optimal thermal management', 89.99, 'ryujin-iii-360.webp', 18, 5, 100, 6),
(11, 'Cooler Master Hyper 212 Spectrum V3', 'Budget-friendly air cooler with good performance', 34.99, 'hyper-212-spectrum-v3.webp', 22, 5, 100, 6),
(12, 'ASUS ROG THOR 1200P2 GAMING 80 Plus Platinum 1200W', 'Reliable 1200W power supply with 80 Plus Platinum certification', 109.99, 'rog-thor-1200p2.webp', 15, 5, 100, 7),
(13, 'Asus ROG Hyperion GR701 RGB', 'Sleek mid-tower case with tempered glass side panel', 69.99, 'rog-hyperion-gr701.jpg', 20, 5, 100, 8),
(14, 'Razer Viper V2 Pro', 'High-performance gaming mouse with customizable DPI', 49.99, 'viper-v2-pro.webp', 25, 5, 100, 9),
(15, 'Razer BlackWidow V4 Pro RGB Mechanical Keyboard', 'Mechanical gaming keyboard with RGB backlighting', 129.99, 'blackwidow-v4-pro.webp', 10, 5, 100, 9),
(16, 'LG 32EP950-B UltraFine OLED Pro 4K', '32-inch 4K monitor with excellent color accuracy', 399.99, 'lg-32-inch.jpg', 5, 5, 100, 10),
(17, 'HP OMEN 24 165Hz FHD IPS', 'Gaming monitor with 165Hz refresh rate and 1ms response time', 279.99, 'hp-omen-24.webp', 14, 5, 100, 10),
(18, 'Asus XONAR AE', 'High-quality external sound card for enhanced audio', 149.99, 'Asus XONAR AE.jpg', 8, 5, 100, 11),
(19, 'Asus ROG Rapture GT-AX11000 Pro', 'WiFi 6 router for fast and stable internet connection', 129.99, 'rog-rapture-gt-ax11000-pro.webp', 12, 5, 100, 12),
(20, 'Elgato Stream Deck', 'Advanced live production controller for streamers', 149.99, 'elgato-stream-deck-mk2.webp', 10, 5, 100, 9);
(21, 'Corsair Vengeance LPX 32GB (2 x 16GB) DDR4 3200MHz', 'High-performance DDR4 memory for gaming and multitasking', 159.99, 'corsair-vengeance-lpx-32gb.jpg', 25, 5, 100, 3),
(22, 'Samsung 970 EVO Plus 1TB NVMe M.2', 'High-speed NVMe SSD for fast data transfer and load times', 149.99, 'samsung-970-evo-plus-1tb.jpg', 30, 5, 100, 4),
(23, 'Gigabyte AORUS GeForce RTX 3080 Master 10G', 'High-end graphics card with 10GB GDDR6X memory', 799.99, 'gigabyte-aorus-rtx-3080.jpg', 12, 5, 100, 2),
(24, 'MSI MPG Z490 Gaming Edge WiFi ATX Motherboard', 'ATX motherboard with WiFi support for Intel processors', 199.99, 'msi-mpg-z490.jpg', 10, 5, 100, 5),
(25, 'NZXT Kraken X73 360mm AIO Liquid Cooler', 'High-performance liquid cooler for optimal thermal management', 179.99, 'nzxt-kraken-x73.jpg', 15, 5, 100, 6),
(26, 'EVGA SuperNOVA 850 G5, 80 Plus Gold 850W', 'Reliable 850W power supply with 80 Plus Gold certification', 129.99, 'evga-supernova-850-g5.jpg', 20, 5, 100, 7),
(27, 'Phanteks Eclipse P400A Digital ATX Mid Tower Case', 'Stylish mid-tower case with digital RGB lighting', 89.99, 'phanteks-eclipse-p400a.jpg', 18, 5, 100, 8),
(28, 'Logitech G502 HERO High Performance Gaming Mouse', 'High-performance gaming mouse with customizable DPI', 49.99, 'logitech-g502-hero.jpg', 25, 5, 100, 9),
(29, 'SteelSeries Apex Pro Mechanical Gaming Keyboard', 'Mechanical gaming keyboard with customizable RGB lighting', 199.99, 'steelseries-apex-pro.jpg', 10, 5, 100, 9),
(30, 'Dell UltraSharp U2720Q 27 Inch 4K UHD Monitor', '27-inch 4K UHD monitor with excellent color accuracy', 499.99, 'dell-ultrasharp-u2720q.jpg', 5, 5, 100, 10);

commit;
