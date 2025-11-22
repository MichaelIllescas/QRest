# Entidades y DTOs — Con Atributos + Requeridos (QRest)

Este documento lista todas las entidades JPA y sus DTOs correspondientes, indicando qué campos son **requeridos** y cuáles **opcionales**.

---

# 🟦 ENTIDADES (JPA)

## Category
- idCategoria : Long (PK)
- nombre : String **(requerido)**
- activa : boolean (por defecto true)
- productos : List<Product> (opcional)

---

## Product
- idProducto : Long (PK)
- category : Category **(requerido)**
- nombre : String **(requerido)**
- descripcion : String (opcional)
- precio : BigDecimal **(requerido)**
- disponible : boolean (por defecto true)
- imagenUrl : String (opcional)

---

## Mesa
- idMesa : Long (PK)
- numeroMesa : int **(requerido)**
- codigoQrUrl : String (auto-generado)
- fechaUltimaRegeneracion : LocalDateTime (auto-generado)

---

## Pedido (Order)
- idPedido : Long (PK)
- mesa : Mesa **(requerido)**
- montoTotal : BigDecimal **(calculado)**
- estadoActual : String **(requerido)**
- fechaCreacion : LocalDateTime (auto)
- fechaUltimaActualizacion : LocalDateTime (auto)
- items : List<OrderItem> **(requerido mínimo 1)**
- historialEstados : List<OrderEstadoHistorial> (interno)

---

## OrderItem
- idItem : Long (PK)
- pedido : Pedido **(requerido)**
- producto : Product **(requerido)**
- nombreProducto : String **(requerido)**
- precioUnitario : BigDecimal **(requerido)**
- cantidad : int **(requerido)**
- subtotal : BigDecimal **(requerido)**

---

## OrderEstadoHistorial
- idHistorial : Long (PK)
- pedido : Pedido **(requerido)**
- estadoAnterior : String (opcional)
- estadoNuevo : String **(requerido)**
- fechaCambio : LocalDateTime (auto)
- usuarioResponsable : String (opcional)

---

## ConfiguracionSistema
- idConfig : Long (PK)
- nombreRestaurante : String **(requerido)**
- logoUrl : String (opcional)
- telefono : String (opcional)
- direccion : String (opcional)
- horarios : String (opcional)
- colorFondo : String (opcional)
- colorTexto : String (opcional)
- colorBotones : String (opcional)
- tema : String (opcional)
- wifiSsid : String (opcional)
- wifiPasswordEncriptado : String (opcional)
- wifiTipoSeguridad : String (opcional)

---

## Usuario
- idUsuario : Long (PK)
- username : String **(requerido)**
- passwordEncriptado : String **(requerido)**
- nombre : String **(requerido)**
- activo : boolean (default true)
- roles : List<Rol> **(requerido mínimo 1)**

---

## Rol
- idRol : Long (PK)
- nombreRol : String **(requerido)**

---

# 🟩 DTOS (API)

## ProductDTO (cliente)
- id : Long
- name : String **(requerido)**
- description : String (opcional)
- price : BigDecimal **(requerido)**
- imageUrl : String (opcional)

---

## ProductAdminDTO
- id : Long
- name : String **(requerido)**
- description : String (opcional)
- price : BigDecimal **(requerido)**
- categoryId : Long **(requerido)**
- available : boolean (requerido)
- imageUrl : String (opcional)

---

## ProductCreateDTO
- name : String **(requerido)**
- description : String (opcional)
- price : BigDecimal **(requerido)**
- categoryId : Long **(requerido)**
- available : boolean (default true)
- imageUrl : String 

---

## ProductUpdateDTO
- name : String (opcional)
- description : String (opcional)
- price : BigDecimal (opcional)
- categoryId : Long (opcional)
- imageUrl : String (opcional)
- available : boolean (opcional)

---

## ProductAvailabilityDTO
- available : boolean **(requerido)**

---

## CategoryDTO
- id : Long
- name : String **(requerido)**

---

## CategoryCreateDTO
- name : String **(requerido)**

---

## CategoryUpdateDTO
- name : String **(requerido)**

---

## MesaDTO
- id : Long
- numeroMesa : int **(requerido)**
- qrUrl : String (opcional)

---

## MesaCreateDTO
- numeroMesa : int **(requerido)**
- descripcionOpcional : String (opcional)

---

## MesaQRDTO
- mesaId : Long **(requerido)**
- qrUrl : String **(requerido)**

---

## OrderDTO
- id : Long
- mesa : int **(requerido)**
- total : BigDecimal **(requerido)**
- status : String **(requerido)**
- createdAt : LocalDateTime **(requerido)**
- items : List<OrderItemDTO> **(requerido)**

---

## OrderItemDTO
- name : String **(requerido)**
- price : BigDecimal **(requerido)**
- qty : int **(requerido)**
- subtotal : BigDecimal **(requerido)**

---

## OrderSummaryDTO
- id : Long
- total : BigDecimal **(requerido)**
- status : String **(requerido)**
- createdAt : LocalDateTime **(requerido)**

---

## OrderCreatedDTO
- orderId : Long
- status : String **(requerido)**

---

## CreateOrderRequestDTO
- mesaId : Long **(requerido)**
- items : List<CreateOrderItemDTO> **(requerido)**

---

## CreateOrderItemDTO
- productId : Long **(requerido)**
- quantity : int **(requerido)**

---

## ChangeStatusRequestDTO
- status : String **(requerido)**

---

## ConfigDTO
- name : String (opcional)
- telefono : String (opcional)
- direccion : String (opcional)
- horarios : String (opcional)
- logoUrl : String (opcional)
- tema : String (opcional)
- colorFondo : String (opcional)
- colorTexto : String (opcional)
- colorBotones : String (opcional)

---

## ConfigUpdateDTO
- name : String (opcional)
- telefono : String (opcional)
- direccion : String (opcional)
- horarios : String (opcional)

---

## ThemeConfigDTO
- backgroundColor : String (opcional)
- textColor : String (opcional)
- buttonColor : String (opcional)
- themeName : String (opcional)

---

## WiFiConfigDTO
- ssid : String **(requerido)**
- password : String **(requerido)**
- securityType : String **(requerido)**

---

## LoginRequestDTO
- username : String **(requerido)**
- password : String **(requerido)**

---

## LoginResponseDTO
- token : String **(requerido)**
- role : String **(requerido)**

---

## UserDTO
- id : Long
- username : String **(requerido)**
- name : String **(requerido)**
- roles : List<String> **(requerido)**

---

## UserCreateDTO
- username : String **(requerido)**
- name : String **(requerido)**
- password : String **(requerido)**
- role : String **(requerido)**

---

## UserUpdateDTO
- username : String (opcional)
- name : String (opcional)

---

## UserRoleUpdateDTO
- role : String **(requerido)**

