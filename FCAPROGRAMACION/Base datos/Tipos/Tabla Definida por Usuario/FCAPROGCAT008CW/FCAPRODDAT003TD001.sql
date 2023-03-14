-- ================================
-- Create User-defined Table Type
-- ================================
USE FcaCajas01
GO

-- Create the data type
CREATE TYPE FCAPRODDAT003TD001 AS TABLE 
(
	[ID] [int]   NULL,
	[RInicial] [int]  NULL,
	[RFinal] [int]  NULL,
	[Desperdicio] [decimal](9, 5)  NULL
)
GO
