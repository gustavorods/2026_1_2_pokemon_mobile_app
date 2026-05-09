import { useState, useEffect, useRef } from 'react';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

import { View, Text, StyleSheet, Image, Animated, Easing } from 'react-native';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Card } from '@/components/card';
import { Alert } from '@/components/alert';
import { Icon } from '@/components/icon';

import BugIcon      from '@assets/images/icons/bug.svg';
import DarkIcon     from '@assets/images/icons/dark.svg';
import DragonIcon   from '@assets/images/icons/dragon.svg';
import ElectricIcon from '@assets/images/icons/electric.svg';
import FairyIcon    from '@assets/images/icons/fairy.svg';
import FightingIcon from '@assets/images/icons/fighting.svg';
import FireIcon     from '@assets/images/icons/fire.svg';
import FlyingIcon   from '@assets/images/icons/flying.svg';
import GhostIcon    from '@assets/images/icons/ghost.svg';
import GrassIcon    from '@assets/images/icons/grass.svg';
import GroundIcon   from '@assets/images/icons/ground.svg';
import IceIcon      from '@assets/images/icons/ice.svg';
import NormalIcon   from '@assets/images/icons/normal.svg';
import PoisonIcon   from '@assets/images/icons/poison.svg';
import PsychicIcon  from '@assets/images/icons/psychic.svg';
import RockIcon     from '@assets/images/icons/rock.svg';
import SteelIcon    from '@assets/images/icons/steel.svg';
import WaterIcon    from '@assets/images/icons/water.svg';

const ALL_ICONS = [
    FireIcon, WaterIcon, GrassIcon, ElectricIcon, PsychicIcon, DragonIcon,
    IceIcon, FightingIcon, PoisonIcon, GroundIcon, FlyingIcon, BugIcon,
    RockIcon, GhostIcon, DarkIcon, SteelIcon, FairyIcon, NormalIcon,
];

export default function Index() {
    const [name, setName] = useState<string>('');
    const [senha, setSenha] = useState<string>('');

    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertData, setAlertData] = useState({
        title: '',
        message: '',
        type: 'error' as 'success' | 'error' | 'warning' | 'info',
    });

    const { signIn } = useAuth();

    const [iconRow, setIconRow] = useState([0, 1, 2, 3]);

    const nextIconIndex = useRef(4);

    const animDrivers = useRef([
        new Animated.Value(1),
        new Animated.Value(1),
        new Animated.Value(1),
        new Animated.Value(1),
    ]).current;

    useEffect(() => {
        const interval = setInterval(() => {
            Animated.stagger(100, animDrivers.map(driver => 
                Animated.timing(driver, {
                    toValue: 0, 
                    duration: 300,
                    easing: Easing.in(Easing.ease), 
                    useNativeDriver: true,
                })
            )).start(() => {
                

                setIconRow(() => {
                    const newIndices = [
                        nextIconIndex.current,
                        (nextIconIndex.current + 1) % ALL_ICONS.length,
                        (nextIconIndex.current + 2) % ALL_ICONS.length,
                        (nextIconIndex.current + 3) % ALL_ICONS.length,
                    ];
                    nextIconIndex.current = (nextIconIndex.current + 4) % ALL_ICONS.length;
                    return newIndices;
                });

                Animated.stagger(120, animDrivers.map(driver => 
                    Animated.timing(driver, {
                        toValue: 1, 
                        duration: 500,                       
                        easing: Easing.out(Easing.back(2)), 
                        useNativeDriver: true,
                    })
                )).start();
            });

        }, 4000);

        return () => clearInterval(interval);
    }, []);

    function validateCredentials() {
        if (name === 'kleber' && senha === '123') {
            signIn(name);
            router.push({ pathname: '/dashboard', params: { username: name } });
        } else {
            setAlertData({
                title: 'Acesso negado',
                message: 'Usuário ou senha incorretos. Tente novamente.',
                type: 'error',
            });
            setIsAlertVisible(true);
        }
    }


    const renderAnimatedIcon = (slotIndex: number, IconComponent: any) => {
        const driver = animDrivers[slotIndex];

        const opacity = driver; 
        const scale = driver.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        });

        return (
            <Animated.View 
                key={slotIndex}
                style={[
                    styles.iconSlot, 
                    { 
                        opacity: opacity,
                        transform: [{ scale: scale }] 
                    }
                ]}
            >
                {IconComponent && <Icon name={IconComponent} size={48} />}
            </Animated.View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.inner}>

                {/* Logo */}
                <Image
                    source={require('@assets/images/pokedex-logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />

                {/* Card de login */}
                <Card>
                    <Text style={styles.cardTitle}>Identificação do Treinador</Text>
                    <Input
                        placeholder="Usuário"
                        onChangeText={setName}
                        autoCapitalize="none"
                        placeholderTextColor="#64748B"
                    />
                    <Input
                        placeholder="Senha"
                        secureTextEntry
                        onChangeText={setSenha}
                        placeholderTextColor="#64748B"
                    />
                    <Button
                        title="Entrar"
                        onPress={validateCredentials}
                    />
                </Card>

                {/* Fila de ícones */}
                <View style={styles.iconRow}>
                    {renderAnimatedIcon(0, ALL_ICONS[iconRow[0]])}
                    {renderAnimatedIcon(1, ALL_ICONS[iconRow[1]])}
                    {renderAnimatedIcon(2, ALL_ICONS[iconRow[2]])}
                    {renderAnimatedIcon(3, ALL_ICONS[iconRow[3]])}
                </View>

            </View>

            <Alert
                title={alertData.title}
                message={alertData.message}
                type={alertData.type}
                visible={isAlertVisible}
                onClose={() => setIsAlertVisible(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    inner: {
        width: '100%',
        maxWidth: 400,
        gap: 24,
    },
    logo: {
        width: '100%',
        height: 100,
        alignSelf: 'center',
    },
    cardTitle: {
        color: '#94A3B8',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 8,
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 22,
        paddingVertical: 12,
    },
    iconSlot: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
});