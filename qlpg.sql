USE [master]
GO
/****** Object:  Database [QLPG]    Script Date: 21/05/2021 10:44:54 SA ******/
CREATE DATABASE [QLPG]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'QLPG', FILENAME = N'D:\MSQL\MSSQL15.MSSQLSERVER\MSSQL\DATA\QLPG.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'QLPG_log', FILENAME = N'D:\MSQL\MSSQL15.MSSQLSERVER\MSSQL\DATA\QLPG_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [QLPG] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [QLPG].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [QLPG] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [QLPG] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [QLPG] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [QLPG] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [QLPG] SET ARITHABORT OFF 
GO
ALTER DATABASE [QLPG] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [QLPG] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [QLPG] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [QLPG] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [QLPG] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [QLPG] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [QLPG] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [QLPG] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [QLPG] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [QLPG] SET  ENABLE_BROKER 
GO
ALTER DATABASE [QLPG] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [QLPG] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [QLPG] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [QLPG] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [QLPG] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [QLPG] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [QLPG] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [QLPG] SET RECOVERY FULL 
GO
ALTER DATABASE [QLPG] SET  MULTI_USER 
GO
ALTER DATABASE [QLPG] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [QLPG] SET DB_CHAINING OFF 
GO
ALTER DATABASE [QLPG] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [QLPG] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [QLPG] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'QLPG', N'ON'
GO
ALTER DATABASE [QLPG] SET QUERY_STORE = OFF
GO
USE [QLPG]
GO
/****** Object:  User [milo]    Script Date: 21/05/2021 10:44:55 SA ******/
CREATE USER [milo] FOR LOGIN [milo] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[account]    Script Date: 21/05/2021 10:44:55 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[account](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [nvarchar](20) NOT NULL,
	[pwd] [nvarchar](20) NOT NULL,
	[rol] [nvarchar](10) NOT NULL,
	[staff_id] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[des_rcp]    Script Date: 21/05/2021 10:44:55 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[des_rcp](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[rcp_code] [nvarchar](20) NOT NULL,
	[eg_code] [int] NOT NULL,
	[quantity] [int] NOT NULL,
	[price] [money] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[eglist]    Script Date: 21/05/2021 10:44:55 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[eglist](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[eg_name] [nvarchar](20) NOT NULL,
	[warranty] [int] NOT NULL,
	[unit] [nvarchar](10) NOT NULL,
	[batch] [nvarchar](10) NOT NULL,
 CONSTRAINT [PK__eglist__3213E83F6FF14525] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[equip_group]    Script Date: 21/05/2021 10:44:55 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[equip_group](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[rcp_code] [nvarchar](20) NOT NULL,
	[quantity] [int] NOT NULL,
	[price] [money] NOT NULL,
	[eg_name] [nvarchar](20) NOT NULL,
	[warranty] [int] NOT NULL,
	[unit] [nvarchar](10) NOT NULL,
	[batch] [nvarchar](20) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[equipment]    Script Date: 21/05/2021 10:44:55 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[equipment](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[eg_id] [int] NOT NULL,
	[des] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[receipt]    Script Date: 21/05/2021 10:44:55 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[receipt](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[rcp_code] [nvarchar](20) NOT NULL,
	[rcp_date] [date] NOT NULL,
	[supplier_id] [int] NOT NULL,
	[staff_id] [int] NOT NULL,
	[total] [money] NOT NULL,
 CONSTRAINT [PK__receipt__3213E83FC461EA79] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[record]    Script Date: 21/05/2021 10:44:55 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[record](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[account_id] [int] NOT NULL,
	[record_date] [datetime] NOT NULL,
	[act] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK__record__3213E83F1BB60E76] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[staff]    Script Date: 21/05/2021 10:44:55 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[staff](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[staff_code] [nvarchar](20) NOT NULL,
	[first_name] [nvarchar](10) NOT NULL,
	[last_name] [nvarchar](20) NOT NULL,
	[birth_date] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[state]    Script Date: 21/05/2021 10:44:55 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[state](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[equipment_id] [int] NOT NULL,
	[state_date] [datetime] NOT NULL,
	[state_des] [nvarchar](20) NOT NULL,
	[check] [bit] NOT NULL,
	[act] [nvarchar](50) NULL,
 CONSTRAINT [PK_state] PRIMARY KEY CLUSTERED 
(
	[equipment_id] ASC,
	[state_date] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[suppliers]    Script Date: 21/05/2021 10:44:55 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[suppliers](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](50) NOT NULL,
	[tax_id] [nvarchar](20) NOT NULL,
	[address] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[account] ON 

INSERT [dbo].[account] ([id], [username], [pwd], [rol], [staff_id]) VALUES (1, N'tri255', N'123456', N'admin', 1)
INSERT [dbo].[account] ([id], [username], [pwd], [rol], [staff_id]) VALUES (2, N'staff', N'123456', N'staff', 2)
INSERT [dbo].[account] ([id], [username], [pwd], [rol], [staff_id]) VALUES (3, N'dat', N'123456', N'staff', 3)
SET IDENTITY_INSERT [dbo].[account] OFF
GO
SET IDENTITY_INSERT [dbo].[equip_group] ON 

INSERT [dbo].[equip_group] ([id], [rcp_code], [quantity], [price], [eg_name], [warranty], [unit], [batch]) VALUES (44, N'123456', 3, 123000.0000, N'may a', 12, N'Máy', N'1')
SET IDENTITY_INSERT [dbo].[equip_group] OFF
GO
SET IDENTITY_INSERT [dbo].[equipment] ON 

INSERT [dbo].[equipment] ([id], [eg_id], [des]) VALUES (145, 44, N'')
INSERT [dbo].[equipment] ([id], [eg_id], [des]) VALUES (146, 44, N'máy 2')
INSERT [dbo].[equipment] ([id], [eg_id], [des]) VALUES (147, 44, N'')
SET IDENTITY_INSERT [dbo].[equipment] OFF
GO
SET IDENTITY_INSERT [dbo].[receipt] ON 

INSERT [dbo].[receipt] ([id], [rcp_code], [rcp_date], [supplier_id], [staff_id], [total]) VALUES (73, N'123456', CAST(N'2021-05-19' AS Date), 16, 1, 369000.0000)
SET IDENTITY_INSERT [dbo].[receipt] OFF
GO
SET IDENTITY_INSERT [dbo].[record] ON 

INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (1, 1, CAST(N'2021-05-10T00:00:00.000' AS DateTime), N'Thêm nhà cung cấp')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (2, 1, CAST(N'2021-05-10T08:52:10.863' AS DateTime), N'Chỉnh sửa nhà cung cấp')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (3, 1, CAST(N'2021-05-10T08:57:18.543' AS DateTime), N'Xóa nhà cung cấp')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (4, 1, CAST(N'2021-05-10T09:01:53.117' AS DateTime), N'Thêm mới hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (5, 1, CAST(N'2021-05-10T09:08:49.267' AS DateTime), N'Xóa hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (6, 1, CAST(N'2021-05-10T09:10:11.170' AS DateTime), N'Xóa hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (7, 1, CAST(N'2021-05-10T09:11:08.600' AS DateTime), N'Xóa hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (8, 1, CAST(N'2021-05-10T09:13:29.917' AS DateTime), N'Xóa hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (9, 1, CAST(N'2021-05-10T09:14:19.790' AS DateTime), N'Thêm mới hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (10, 1, CAST(N'2021-05-10T09:14:30.737' AS DateTime), N'Chỉnh sửa hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (11, 1, CAST(N'2021-05-10T09:19:06.203' AS DateTime), N'chỉnh sửa thiết bị')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (12, 2, CAST(N'2021-05-10T10:07:11.047' AS DateTime), N'Thêm nhà cung cấp')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (13, 2, CAST(N'2021-05-10T15:03:29.000' AS DateTime), N'chỉnh sửa thiết bị')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (14, 1, CAST(N'2021-05-10T15:09:09.187' AS DateTime), N'Thêm nhà cung cấp')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (15, 1, CAST(N'2021-05-12T14:47:16.423' AS DateTime), N'Thêm mới hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (16, 1, CAST(N'2021-05-12T14:48:30.453' AS DateTime), N'Xóa hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (17, 1, CAST(N'2021-05-12T14:48:31.197' AS DateTime), N'Xóa hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (18, 1, CAST(N'2021-05-12T15:18:26.423' AS DateTime), N'Xóa hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (19, 1, CAST(N'2021-05-12T15:18:42.813' AS DateTime), N'Thêm mới hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (20, 1, CAST(N'2021-05-12T15:18:49.057' AS DateTime), N'Xóa hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (21, 1, CAST(N'2021-05-12T16:01:01.037' AS DateTime), N'chỉnh sửa thiết bị')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (22, 1, CAST(N'2021-05-12T16:01:31.947' AS DateTime), N'chỉnh sửa thiết bị')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (23, 1, CAST(N'2021-05-12T16:01:54.760' AS DateTime), N'chỉnh sửa thiết bị')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (24, 1, CAST(N'2021-05-12T16:10:35.100' AS DateTime), N'Xóa nhà cung cấp')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (25, 1, CAST(N'2021-05-12T16:11:22.027' AS DateTime), N'Thêm mới hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (26, 1, CAST(N'2021-05-12T16:11:28.553' AS DateTime), N'Thêm mới hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (27, 1, CAST(N'2021-05-12T16:11:38.080' AS DateTime), N'Thêm mới hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (28, 1, CAST(N'2021-05-12T16:11:41.200' AS DateTime), N'Xóa hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (29, 1, CAST(N'2021-05-12T16:27:23.643' AS DateTime), N'Thêm nhà cung cấp')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (30, 1, CAST(N'2021-05-12T16:27:27.803' AS DateTime), N'Thêm nhà cung cấp')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (31, 1, CAST(N'2021-05-12T16:27:59.233' AS DateTime), N'Chỉnh sửa nhà cung cấp')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (32, 1, CAST(N'2021-05-12T16:33:34.023' AS DateTime), N'Xóa hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (33, 1, CAST(N'2021-05-12T16:34:14.457' AS DateTime), N'Xóa hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (34, 1, CAST(N'2021-05-12T16:34:22.033' AS DateTime), N'Xóa nhà cung cấp')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (35, 1, CAST(N'2021-05-12T16:35:17.940' AS DateTime), N'Thêm mới hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (36, 1, CAST(N'2021-05-12T16:35:37.010' AS DateTime), N'chỉnh sửa thiết bị')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (37, 1, CAST(N'2021-05-12T16:35:44.460' AS DateTime), N'chỉnh sửa thiết bị')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (38, 1, CAST(N'2021-05-12T16:35:50.607' AS DateTime), N'chỉnh sửa thiết bị')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (39, 1, CAST(N'2021-05-12T16:35:59.807' AS DateTime), N'chỉnh sửa thiết bị')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (40, 1, CAST(N'2021-05-13T08:40:36.537' AS DateTime), N'Xóa hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (41, 2, CAST(N'2021-05-13T08:40:48.687' AS DateTime), N'Xóa hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (42, 2, CAST(N'2021-05-13T08:41:31.130' AS DateTime), N'Thêm mới hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (43, 2, CAST(N'2021-05-13T08:44:23.420' AS DateTime), N'Xóa hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (44, 2, CAST(N'2021-05-13T08:44:54.820' AS DateTime), N'Thêm mới hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (45, 2, CAST(N'2021-05-13T08:47:56.510' AS DateTime), N'Thêm mới hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (46, 1, CAST(N'2021-05-13T08:54:28.243' AS DateTime), N'chỉnh sửa thiết bị')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (47, 1, CAST(N'2021-05-13T08:55:22.450' AS DateTime), N'chỉnh sửa thiết bị')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (48, 1, CAST(N'2021-05-13T08:59:41.940' AS DateTime), N'chỉnh sửa thiết bị')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (49, 1, CAST(N'2021-05-13T09:10:20.947' AS DateTime), N'chỉnh sửa thiết bị')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (50, 1, CAST(N'2021-05-13T09:27:51.533' AS DateTime), N'Thêm mới hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (51, 1, CAST(N'2021-05-13T09:28:31.047' AS DateTime), N'Thêm mới hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (52, 1, CAST(N'2021-05-13T09:46:06.107' AS DateTime), N'Xóa hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (53, 1, CAST(N'2021-05-13T09:46:07.957' AS DateTime), N'Xóa hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (54, 1, CAST(N'2021-05-13T09:46:28.117' AS DateTime), N'Thêm mới hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (55, 1, CAST(N'2021-05-13T09:46:31.863' AS DateTime), N'Thêm mới hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (56, 1, CAST(N'2021-05-13T09:49:23.513' AS DateTime), N'chỉnh sửa thiết bị')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (57, 1, CAST(N'2021-05-13T09:51:51.627' AS DateTime), N'Xóa hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (58, 1, CAST(N'2021-05-13T09:51:52.410' AS DateTime), N'Xóa hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (59, 1, CAST(N'2021-05-13T09:51:53.173' AS DateTime), N'Xóa hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (60, 1, CAST(N'2021-05-13T09:51:53.933' AS DateTime), N'Xóa hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (61, 1, CAST(N'2021-05-13T09:51:54.843' AS DateTime), N'Xóa hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (62, 1, CAST(N'2021-05-13T10:08:31.890' AS DateTime), N'Thêm mới hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (63, 1, CAST(N'2021-05-13T10:10:13.897' AS DateTime), N'chỉnh sửa thiết bị')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (64, 1, CAST(N'2021-05-13T10:12:01.787' AS DateTime), N'chỉnh sửa thiết bị')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (65, 1, CAST(N'2021-05-13T10:12:11.210' AS DateTime), N'chỉnh sửa thiết bị')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (66, 1, CAST(N'2021-05-13T10:12:37.980' AS DateTime), N'Xóa hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (67, 1, CAST(N'2021-05-13T15:37:22.237' AS DateTime), N'Thêm mới hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (68, 1, CAST(N'2021-05-13T16:06:29.953' AS DateTime), N'Xóa nhà cung cấp')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (69, 1, CAST(N'2021-05-15T10:39:34.333' AS DateTime), N'Xóa hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (70, 1, CAST(N'2021-05-15T10:42:35.277' AS DateTime), N'Thêm mới hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (71, 1, CAST(N'2021-05-15T15:19:31.243' AS DateTime), N'chỉnh sửa thiết bị')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (72, 1, CAST(N'2021-05-15T15:52:50.440' AS DateTime), N'Xóa thiết bị')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (73, 1, CAST(N'2021-05-15T15:54:48.813' AS DateTime), N'Xóa thiết bị')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (74, 1, CAST(N'2021-05-15T15:54:48.970' AS DateTime), N'Xóa thiết bị')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (75, 1, CAST(N'2021-05-15T15:54:49.137' AS DateTime), N'Xóa thiết bị')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (76, 1, CAST(N'2021-05-15T15:54:49.290' AS DateTime), N'Xóa thiết bị')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (77, 1, CAST(N'2021-05-15T15:54:49.443' AS DateTime), N'Xóa thiết bị')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (78, 1, CAST(N'2021-05-15T15:54:49.603' AS DateTime), N'Xóa thiết bị')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (79, 1, CAST(N'2021-05-15T15:54:49.763' AS DateTime), N'Xóa thiết bị')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (80, 1, CAST(N'2021-05-15T15:54:49.933' AS DateTime), N'Xóa thiết bị')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (81, 1, CAST(N'2021-05-15T15:54:50.103' AS DateTime), N'Xóa thiết bị')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (82, 1, CAST(N'2021-05-15T15:54:50.387' AS DateTime), N'Xóa thiết bị')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (83, 2, CAST(N'2021-05-18T21:39:59.513' AS DateTime), N'Xóa nhà cung cấp')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (84, 1, CAST(N'2021-05-19T19:38:31.717' AS DateTime), N'Xóa hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (85, 1, CAST(N'2021-05-19T19:38:48.150' AS DateTime), N'Thêm mới hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (86, 1, CAST(N'2021-05-19T19:38:52.517' AS DateTime), N'Xóa hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (87, 1, CAST(N'2021-05-19T19:39:33.427' AS DateTime), N'Thêm mới hóa đơn')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (88, 1, CAST(N'2021-05-19T20:55:18.210' AS DateTime), N'Thêm tài khoản')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (89, 3, CAST(N'2021-05-19T20:59:37.580' AS DateTime), N'chỉnh sửa thiết bị')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (90, 1, CAST(N'2021-05-21T09:16:35.817' AS DateTime), N'Đặt lại mật khẩu')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (91, 1, CAST(N'2021-05-21T09:16:58.897' AS DateTime), N'Đặt lại mật khẩu')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (92, 1, CAST(N'2021-05-21T09:19:13.913' AS DateTime), N'Đặt lại mật khẩu')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (93, 1, CAST(N'2021-05-21T09:20:19.740' AS DateTime), N'Đặt lại mật khẩu')
INSERT [dbo].[record] ([id], [account_id], [record_date], [act]) VALUES (94, 1, CAST(N'2021-05-21T09:21:13.433' AS DateTime), N'Đặt lại mật khẩu')
SET IDENTITY_INSERT [dbo].[record] OFF
GO
SET IDENTITY_INSERT [dbo].[staff] ON 

INSERT [dbo].[staff] ([id], [staff_code], [first_name], [last_name], [birth_date]) VALUES (1, N'NV1', N'trí', N'trần', CAST(N'2000-05-25' AS Date))
INSERT [dbo].[staff] ([id], [staff_code], [first_name], [last_name], [birth_date]) VALUES (2, N'NV2', N'Trí', N'Trần Nguyên Thiên', CAST(N'1900-01-01' AS Date))
INSERT [dbo].[staff] ([id], [staff_code], [first_name], [last_name], [birth_date]) VALUES (3, N'123457890', N'đạt', N'hồ quốc', CAST(N'2000-06-08' AS Date))
SET IDENTITY_INSERT [dbo].[staff] OFF
GO
SET IDENTITY_INSERT [dbo].[state] ON 

INSERT [dbo].[state] ([id], [equipment_id], [state_date], [state_des], [check], [act]) VALUES (158, 145, CAST(N'2021-05-19T19:39:33.570' AS DateTime), N'Bình thường', 1, N'Thêm mới')
INSERT [dbo].[state] ([id], [equipment_id], [state_date], [state_des], [check], [act]) VALUES (159, 146, CAST(N'2021-05-19T19:39:33.587' AS DateTime), N'Bình thường', 0, N'Thêm mới')
INSERT [dbo].[state] ([id], [equipment_id], [state_date], [state_des], [check], [act]) VALUES (161, 146, CAST(N'2021-05-19T20:59:37.577' AS DateTime), N'Bình thường', 1, N'Chỉnh sửa')
INSERT [dbo].[state] ([id], [equipment_id], [state_date], [state_des], [check], [act]) VALUES (160, 147, CAST(N'2021-05-19T19:39:33.597' AS DateTime), N'Bình thường', 1, N'Thêm mới')
SET IDENTITY_INSERT [dbo].[state] OFF
GO
SET IDENTITY_INSERT [dbo].[suppliers] ON 

INSERT [dbo].[suppliers] ([id], [name], [tax_id], [address]) VALUES (16, N'the gym', N'03676490491', N'hàn thuyên, thủ đức')
INSERT [dbo].[suppliers] ([id], [name], [tax_id], [address]) VALUES (17, N'fitness', N'273658659', N'đinh bộ lĩnh, bình thạnh')
SET IDENTITY_INSERT [dbo].[suppliers] OFF
GO
/****** Object:  Index [UQ__account__1963DD9D26A01085]    Script Date: 21/05/2021 10:44:55 SA ******/
ALTER TABLE [dbo].[account] ADD UNIQUE NONCLUSTERED 
(
	[staff_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__account__F3DBC5724A5A1C5A]    Script Date: 21/05/2021 10:44:55 SA ******/
ALTER TABLE [dbo].[account] ADD UNIQUE NONCLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__receipt__FAE251D110073193]    Script Date: 21/05/2021 10:44:55 SA ******/
ALTER TABLE [dbo].[receipt] ADD  CONSTRAINT [UQ__receipt__FAE251D110073193] UNIQUE NONCLUSTERED 
(
	[rcp_code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__staff__097F328619E20A95]    Script Date: 21/05/2021 10:44:55 SA ******/
ALTER TABLE [dbo].[staff] ADD UNIQUE NONCLUSTERED 
(
	[staff_code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__state__3213E83E46781D21]    Script Date: 21/05/2021 10:44:55 SA ******/
ALTER TABLE [dbo].[state] ADD  CONSTRAINT [UQ__state__3213E83E46781D21] UNIQUE NONCLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__supplier__129B8671C4C8992E]    Script Date: 21/05/2021 10:44:55 SA ******/
ALTER TABLE [dbo].[suppliers] ADD UNIQUE NONCLUSTERED 
(
	[tax_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[state] ADD  CONSTRAINT [DF_state_check]  DEFAULT ((1)) FOR [check]
GO
ALTER TABLE [dbo].[state] ADD  CONSTRAINT [DF_state_act]  DEFAULT (' ') FOR [act]
GO
ALTER TABLE [dbo].[account]  WITH CHECK ADD  CONSTRAINT [FK_account_staff] FOREIGN KEY([staff_id])
REFERENCES [dbo].[staff] ([id])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[account] CHECK CONSTRAINT [FK_account_staff]
GO
ALTER TABLE [dbo].[des_rcp]  WITH CHECK ADD  CONSTRAINT [FK_des_rcp_eglist] FOREIGN KEY([eg_code])
REFERENCES [dbo].[eglist] ([id])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[des_rcp] CHECK CONSTRAINT [FK_des_rcp_eglist]
GO
ALTER TABLE [dbo].[equip_group]  WITH CHECK ADD  CONSTRAINT [FK_equip_group_receipt] FOREIGN KEY([rcp_code])
REFERENCES [dbo].[receipt] ([rcp_code])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[equip_group] CHECK CONSTRAINT [FK_equip_group_receipt]
GO
ALTER TABLE [dbo].[equipment]  WITH CHECK ADD  CONSTRAINT [FK_equipment_equip_group] FOREIGN KEY([eg_id])
REFERENCES [dbo].[equip_group] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[equipment] CHECK CONSTRAINT [FK_equipment_equip_group]
GO
ALTER TABLE [dbo].[receipt]  WITH CHECK ADD  CONSTRAINT [FK_receipt_account] FOREIGN KEY([staff_id])
REFERENCES [dbo].[account] ([id])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[receipt] CHECK CONSTRAINT [FK_receipt_account]
GO
ALTER TABLE [dbo].[receipt]  WITH CHECK ADD  CONSTRAINT [FK_receipt_suppliers] FOREIGN KEY([supplier_id])
REFERENCES [dbo].[suppliers] ([id])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[receipt] CHECK CONSTRAINT [FK_receipt_suppliers]
GO
ALTER TABLE [dbo].[record]  WITH CHECK ADD  CONSTRAINT [FK_record_account] FOREIGN KEY([account_id])
REFERENCES [dbo].[account] ([id])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[record] CHECK CONSTRAINT [FK_record_account]
GO
ALTER TABLE [dbo].[state]  WITH CHECK ADD  CONSTRAINT [FK_state_equipment] FOREIGN KEY([equipment_id])
REFERENCES [dbo].[equipment] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[state] CHECK CONSTRAINT [FK_state_equipment]
GO
/****** Object:  StoredProcedure [dbo].[DeleteEG]    Script Date: 21/05/2021 10:44:55 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[DeleteEG]
(
	@rcp_code nvarchar(20)
)
as 
begin
	delete from des_rcp where rcp_code = @rcp_code
end
GO
/****** Object:  StoredProcedure [dbo].[DeleteEquipment]    Script Date: 21/05/2021 10:44:55 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[DeleteEquipment]
(
	@id int,
	@account_id int
)
as 
begin
	insert into state (equipment_id, state_date, state_des, act) values (@id, GETDATE(), N'Đã xóa', N'Xóa')
	update state set [check] = 0 where equipment_id = @id 
	insert into record (account_id, record_date, act) values (@account_id, GETDATE(), N'Xóa thiết bị')
end
GO
/****** Object:  StoredProcedure [dbo].[DeleteNcc]    Script Date: 21/05/2021 10:44:55 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[DeleteNcc]
(
	@id int,
	@account_id int
)
as
begin
	delete from suppliers where id = @id
	insert into record (account_id, record_date, act) values (@account_id, GETDATE(), N'Xóa nhà cung cấp')
end
GO
/****** Object:  StoredProcedure [dbo].[DeleteReceipt]    Script Date: 21/05/2021 10:44:55 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[DeleteReceipt] 
(
	@rcp_code nvarchar(20),
	@account_id int
)
as
begin
	delete from equip_group where rcp_code = @rcp_code
	delete from receipt where rcp_code = @rcp_code
	insert into record (account_id, record_date, act) values (@account_id, GETDATE(), N'Xóa hóa đơn')
end
GO
/****** Object:  StoredProcedure [dbo].[EditEquipment]    Script Date: 21/05/2021 10:44:55 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[EditEquipment]
(
	@id int,
	@state_des nvarchar(20),
	@des nvarchar(50), 
	@account_id int
) 
as
begin
	update state set [check] = 0 where equipment_id = @id
	update equipment set des = @des where id = @id
	insert into state (equipment_id, state_date, state_des, act) values (@id, GETDATE(), @state_des, N'Chỉnh sửa')
	insert into record (account_id, record_date, act) values (@account_id, GETDATE(), N'chỉnh sửa thiết bị')
end
GO
/****** Object:  StoredProcedure [dbo].[EditNcc]    Script Date: 21/05/2021 10:44:55 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[EditNcc]
(
	@id int,
	@tenncc nvarchar(50),
	@mathue nvarchar(20),
	@diachi nvarchar(50),
	@account_id int
)
as 
begin
	update suppliers set name = @tenncc, address = @diachi, tax_id = @mathue where id = @id
	insert into record (account_id, record_date, act) values (@account_id, GETDATE(), N'Chỉnh sửa nhà cung cấp')
end
GO
/****** Object:  StoredProcedure [dbo].[EditReceipt]    Script Date: 21/05/2021 10:44:55 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[EditReceipt]
(
	@id int,
	@rcp_code nvarchar(20),
	@rcp_date date,
	@supplier_id int,
	@staff_id int,
	@total money,
	@account_id int
)
as
begin
	update receipt set rcp_code = @rcp_code, rcp_date = @rcp_date, supplier_id = @supplier_id, staff_id = @staff_id, total = @total where id = @id
	insert into record (account_id, record_date, act) values (@account_id, GETDATE(), N'Chỉnh sửa hóa đơn')
end
GO
/****** Object:  StoredProcedure [dbo].[FetchEG]    Script Date: 21/05/2021 10:44:55 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[FetchEG]
(
	@rcp_code nvarchar(20)
)
as 
begin
	select id, eg_name as name, warranty as warrantyPeriod, unit, batch, rcp_code, quantity, price from equip_group where rcp_code = @rcp_code
end
GO
/****** Object:  StoredProcedure [dbo].[FetchEquipment]    Script Date: 21/05/2021 10:44:55 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[FetchEquipment]
(
	@id int
) 
as
begin
	select equipment.id, eg_name, warranty, des, state.state_des  from equipment inner join equip_group on equipment.eg_id = equip_group.id inner join receipt on equip_group.rcp_code = receipt.rcp_code inner join suppliers on receipt.supplier_id = suppliers.id inner join state on state.equipment_id = equipment.id where state.[check] = 1 and equipment.id = @id
end
GO
/****** Object:  StoredProcedure [dbo].[FetchRecord]    Script Date: 21/05/2021 10:44:55 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[FetchRecord] 
(
	@rol nvarchar(10)
)
as
begin
	if @rol = N'admin'
		select last_name + ' ' + first_name as staff_name, staff_id, act, record_date from record inner join account on account_id = account.id inner join staff on account.id = staff.id
	else 
		select 'no permission' as msg
end
GO
/****** Object:  StoredProcedure [dbo].[GetAccount]    Script Date: 21/05/2021 10:44:55 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[GetAccount]
(	@username nvarchar(20),
	@password nvarchar(20)
)
as
begin
	select id, username, rol from account where username = @username and pwd = @password
end
GO
/****** Object:  StoredProcedure [dbo].[GetAccounts]    Script Date: 21/05/2021 10:44:55 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[GetAccounts]
(
	@rol nvarchar(10)
)
as
begin
	if @rol = N'admin'
		select account.id, username, rol, staff_code, last_name, first_name, birth_date from account inner join staff on staff_id = staff.id
	else 
		select 'no permission' as msg
end
GO
/****** Object:  StoredProcedure [dbo].[GetEquipment]    Script Date: 21/05/2021 10:44:55 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[GetEquipment]
as
begin
	select equipment.id, eg_name, warranty, suppliers.name, des, state.state_des, rcp_date  from equipment inner join equip_group on equipment.eg_id = equip_group.id inner join receipt on equip_group.rcp_code = receipt.rcp_code inner join suppliers on receipt.supplier_id = suppliers.id inner join state on state.equipment_id = equipment.id where state.[check] = 1
end
GO
/****** Object:  StoredProcedure [dbo].[GetProfile]    Script Date: 21/05/2021 10:44:55 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE procedure [dbo].[GetProfile]
(
	@account_id int
)
as
begin
	select first_name, last_name, birth_date, staff_code from account inner join staff on staff_id = staff.id where account.id = @account_id
end
GO
/****** Object:  StoredProcedure [dbo].[GetStateRecord]    Script Date: 21/05/2021 10:44:55 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[GetStateRecord]
(
	@rol nvarchar(10)
)
as
begin
	if @rol = N'admin'
		select equipment.id as equip_id, eg_name, state_date, des, state.state_des, state.act  from equipment inner join equip_group on equipment.eg_id = equip_group.id inner join receipt on equip_group.rcp_code = receipt.rcp_code inner join suppliers on receipt.supplier_id = suppliers.id inner join state on state.equipment_id = equipment.id order by state_date ASC
	else 
		select 'no permission' as msg
end
GO
/****** Object:  StoredProcedure [dbo].[InsertAccount]    Script Date: 21/05/2021 10:44:55 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[InsertAccount]
(	
	@account_id int,
	@id_code nvarchar(20),
	@first_name nvarchar(10),
	@last_name nvarchar(20),
	@birth_date date,
	@username nvarchar(20),
	@rol nvarchar(10)
)
as
begin
	insert into staff (staff_code, first_name, last_name, birth_date) values (@id_code, @first_name, @last_name, @birth_date)
	insert into account (username, pwd, rol, staff_id) values (@username, '123456', @rol, SCOPE_IDENTITY())
	insert into record (account_id, record_date, act) values (@account_id, GETDATE(), N'Thêm tài khoản')
end

GO
/****** Object:  StoredProcedure [dbo].[InsertEg]    Script Date: 21/05/2021 10:44:55 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[InsertEg] 
(
	@eg_name nvarchar(20),	
	@warranty int,	
	@unit nvarchar(10),	
	@batch nvarchar(10),
	@rcp_code nvarchar(20),
	@quantity int,
	@price money 
)
as
begin
	insert into equip_group (rcp_code, quantity, price, eg_name, warranty, unit, batch) values (@rcp_code, @quantity, @price, @eg_name, @warranty, @unit, @batch)
	select SCOPE_IDENTITY() as id
end
GO
/****** Object:  StoredProcedure [dbo].[InsertEquipment]    Script Date: 21/05/2021 10:44:55 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[InsertEquipment]
(
	@eg_id int
)
as 
begin
	insert into equipment (eg_id, des) values (@eg_id, '')
	insert into state (equipment_id, state_date, state_des, act) values (SCOPE_IDENTITY(), GETDATE(), N'Bình thường', N'Thêm mới')
end
GO
/****** Object:  StoredProcedure [dbo].[InsertNcc]    Script Date: 21/05/2021 10:44:55 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[InsertNcc]
(
	@ten nvarchar(50),
	@diachi nvarchar(50),
	@mathue nvarchar(20),
	@account_id int
)
as
begin
	insert into suppliers (name, address, tax_id) values (@ten, @diachi, @mathue)
	insert into record (account_id, record_date, act) values (@account_id, GETDATE(), N'Thêm nhà cung cấp')
	select * from suppliers where tax_id = @mathue
end
GO
/****** Object:  StoredProcedure [dbo].[InsertReceipt]    Script Date: 21/05/2021 10:44:55 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[InsertReceipt] 
(
	@rcp_code nvarchar(20),
	@rcp_date date,
	@supplier_id int,
	@staff_id int,
	@total money, 
	@account_id int
)
as
begin
	insert into receipt (rcp_code, rcp_date, supplier_id, staff_id, total) values (@rcp_code, @rcp_date, @supplier_id, @staff_id, @total)
	insert into record (account_id, record_date, act) values (@account_id, GETDATE(), N'Thêm mới hóa đơn')
	select receipt.id, rcp_code, rcp_date, name, receipt.supplier_id, staff_id, total from receipt inner join suppliers on receipt.supplier_id = suppliers.id where rcp_code = @rcp_code
end
GO
/****** Object:  StoredProcedure [dbo].[ResetPwd]    Script Date: 21/05/2021 10:44:55 SA ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[ResetPwd]
(
	@rol nvarchar(10),
	@id int,
	@account_id int
)
as
begin
	if @rol = N'admin'
		begin
			update account set pwd = '123456' where id = @id
			insert into record (account_id, record_date, act) values (@account_id, GETDATE(), N'Đặt lại mật khẩu')
		end
	else 
		select 'no permission' as msg
end
GO
USE [master]
GO
ALTER DATABASE [QLPG] SET  READ_WRITE 
GO
